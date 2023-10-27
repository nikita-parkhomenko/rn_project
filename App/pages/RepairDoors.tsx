// outsource dependencies
import * as React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useNetInfo } from '@react-native-community/netinfo';
import { InteractionManager, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Caption, Surface, Text, Title } from 'react-native-paper';

// local dependencies
import Routes from '../routing/Routes';
import PageTitle from '../components/PageTitle';
import NoResults from '../components/NoResults';
import DoorStatus from '../constants/DoorStatus';
import { RepairStackParamList } from '../routing/RepairStackScreen';
import BackgroundGlitchFix from '../components/BackgroundGlitchFix';
import { backgroundColor, doorStageColor } from '../constants/Style';
import { Door, DoorHeaderFragment, useDoorsQuery } from '../queries';
import DoorsInstallationsFilter, { DoorFilter } from '../components/door/DoorInstallationsFilter';

type RepairDoorsNavigationProp = StackScreenProps<RepairStackParamList, Routes.RepairDoors>;

export default function RepairDoors({ navigation }: RepairDoorsNavigationProp) {
  const [page, setPage] = useState(0);
  const [allDoors, setAllDoors] = useState<DoorHeaderFragment[]>([]);
  const [filter, setFilter] = useState<DoorFilter>({
    statuses: [DoorStatus.RequiresRepair],
  });

  const pageSize = 25;
  const netInfo = useNetInfo();

  const { data, error, refetch } = useDoorsQuery({
    variables: {
      active: true,
      take: pageSize,
      sortDirection: 'asc',
      skip: pageSize * page,
      tagged: filter.tagged,
      statuses: filter.statuses,
      sortField: 'projectReference',
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

  const getDoorStage = (door: Partial<Door> | DoorHeaderFragment | null | undefined) => {
    const stageStyles: any[] = [styles.stage];
    let statusName: string;
    switch (door?.status?.code) {
      case DoorStatus.RequiresRepair:
        stageStyles.push(styles.repairStage);
        statusName = 'Requires repair';
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
        title="Door requires repair"
        right={<DoorsInstallationsFilter setFilter={setFilter} filter={filter} />}
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
          data={allDoors}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.flatListContent}
          keyExtractor={(item) => item.id as string}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: backgroundColor,
  },
  rowContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(196, 208, 222, 0.15)',
  },
  spinnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    width: 0,
    flexGrow: 1,
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
  repairStage: {
    backgroundColor: doorStageColor.repairSrage,
  },
  otherStage: {
    backgroundColor: doorStageColor.otherStage,
  },
  flatListContent: {},
});
