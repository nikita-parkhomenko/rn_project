import { useNetInfo } from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { InteractionManager, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator, Caption, Surface, Title, Text } from 'react-native-paper';
import BackgroundGlitchFix from '../components/BackgroundGlitchFix';
import DoorsInspectionsFilter, { DoorFilter } from '../components/door/DoorInspectionsFilter';
import NoResults from '../components/NoResults';
import PageTitle from '../components/PageTitle';
import DoorStatus from '../constants/DoorStatus';
import { backgroundColor, primaryColour } from '../constants/Style';
import { Door, useDoorInstallationsInProgressQuery } from '../queries';
import { InspectionStackParamList } from '../routing/InspectionsStackScreen';
import Routes from '../routing/Routes';

type InspectorDoorsNavigationProp = StackScreenProps<InspectionStackParamList, Routes.InspectorDoors>;

export default function InspectorDoors({ navigation }: InspectorDoorsNavigationProp) {
  const [allDoors, setAllDoors] = useState<Partial<Door>[]>([]);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<DoorFilter>({
    statuses: [DoorStatus.InspectionRequiresSignOff, DoorStatus.Inspecting],
  });
  const netInfo = useNetInfo();
  const pageSize = 25;
  const { data, error, refetch } = useDoorInstallationsInProgressQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      skip: pageSize * page,
      take: pageSize,
      sortDirection: 'asc',
      sortField: 'projectReference',
      active: true,
      statuses: filter.statuses,
      tagged: filter.tagged,
    },
  });

  // this is a hack to fix an error being thrown when calling refetch in useFocusEffect - this error
  // only happens when hot reloading https://github.com/apollographql/react-apollo/issues/3917
  const _refetch = useCallback(() => {
    const task = InteractionManager.runAfterInteractions(async () => {
      if (refetch) await refetch();
    });
    return () => task.cancel();
  }, [refetch]);

  useFocusEffect(
    useCallback(() => {
      _refetch();
    }, [_refetch])
  );

  useEffect(() => {
    if (data?.doors.items) {
      // find only items that are not already included
      if (page === 0) {
        setAllDoors(data?.doors.items);
      } else {
        setAllDoors((oldArray) => [...oldArray, ...data?.doors.items]);
      }
    }
  }, [data, page]);

  const loadMore = () => {
    if (data?.doors.hasMore) {
      // Increasing the page size triggers a new search
      setPage(page + 1);
    }
  };

  const getDoorStage = (door: Partial<Door> | null | undefined) => {
    const stageStyles: any[] = [styles.stage];
    let statusName: string;
    switch (door?.status?.code) {
      case DoorStatus.Inspecting:
        stageStyles.push(styles.inspectingStage);
        statusName = 'Inspecting';
        break;
      case DoorStatus.InspectionDue:
        stageStyles.push(styles.requiresSignOff);
        statusName = 'Inspection Due';
        break;
      case DoorStatus.InspectionOverdue:
        stageStyles.push(styles.requiresSignOff);
        statusName = 'Inspection Overdue';
        break;
      case DoorStatus.InspectionFailedSignOff:
        stageStyles.push(styles.inspectFailedSignOff);
        statusName = 'Inspection Failed';
        break;
      case DoorStatus.InspectionRequiresSignOff:
        stageStyles.push(styles.requiresSignOff);
        statusName = 'Req sign off';
        break;
      default:
        stageStyles.push(styles.otherStage);
        statusName = 'Other';
        break;
    }

    return (
      <View style={stageStyles}>
        <Title style={styles.stageTitle}>{statusName}</Title>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackgroundGlitchFix />
      <PageTitle
        title="Inspections in progress"
        right={<DoorsInspectionsFilter setFilter={setFilter} filter={filter} />}
      />

      {error && !netInfo.isInternetReachable && (
        <View style={[styles.container, styles.spinnerContainer]}>
          <Text>Cannot fetch doors when offline</Text>
        </View>
      )}
      {error && netInfo.isInternetReachable && (
        <View style={[styles.container, styles.spinnerContainer]}>
          <Text>There was an error fetching doors</Text>
          <Text>{error.message}</Text>
        </View>
      )}
      {!error && (
        <FlatList
          contentContainerStyle={styles.flatListContent}
          data={allDoors}
          keyExtractor={(item) => item.id as string}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<>{data?.doors.hasMore && <ActivityIndicator animating size="large" />}</>}
          renderItem={({ item }) => (
            <View style={styles.rowContainer}>
              <TouchableOpacity onPress={() => navigation.navigate(Routes.Door, { doorId: Number(item.id) })}>
                <Surface style={styles.surface}>
                  <View style={styles.textContainer}>
                    <Title style={[styles.text, styles.title]}>
                      {item.site?.name ?? item.doorReference ?? item.id}
                    </Title>
                    <Caption style={styles.text}>{item.location ?? item.projectReference}</Caption>
                  </View>
                  {getDoorStage(item)}
                </Surface>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={NoResults}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  surface: {
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    backgroundColor: backgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowContainer: {
    borderBottomColor: 'rgba(196, 208, 222, 0.15)',
    borderBottomWidth: 1,
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: 0,
    flexGrow: 1,
    flex: 1,
    marginRight: 5,
  },
  text: {
    fontSize: 12,
    lineHeight: 15,
  },
  title: {
    fontSize: 14,
  },
  stageTitle: { fontSize: 11, height: 25, lineHeight: 25 },
  stage: {
    width: 120,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 3,
  },
  requiresSignOff: {
    backgroundColor: primaryColour,
  },
  inspectingStage: {
    backgroundColor: '#C68D50',
  },
  inspectFailedSignOff: {
    backgroundColor: '#EC5C6D',
  },
  otherStage: {
    backgroundColor: '#696A81',
  },
  flatListContent: {},
});
