import { useNetInfo } from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { InteractionManager, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator, Caption, Surface, Title, Text } from 'react-native-paper';
import BackgroundGlitchFix from '../components/BackgroundGlitchFix';
import DoorsTagFilter from '../components/door/DoorTagFilter';
import PageTitle from '../components/PageTitle';
import DoorStatus from '../constants/DoorStatus';
import { backgroundColor, primaryColour } from '../constants/Style';
import { Door, useDoorsQuery } from '../queries';
import { DoorsStackParamList } from '../routing/DoorsStackScreen';
import Routes from '../routing/Routes';

type ManufacturedDoorsNavigationProp = StackScreenProps<DoorsStackParamList, Routes.ManufacturedDoors>;

export default function ManufacturedDoors({ navigation }: ManufacturedDoorsNavigationProp) {
  const [allDoors, setAllDoors] = useState<Partial<Door>[]>([]);
  const [page, setPage] = useState(0);
  const [showTagged, setShowTagged] = useState(false);
  const netInfo = useNetInfo();
  const pageSize = 25;
  const { data, error, refetch } = useDoorsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      skip: pageSize * page,
      take: pageSize,
      sortDirection: 'asc',
      sortField: 'projectReference',
      active: true,
      tagged: showTagged,
      statuses: [DoorStatus.ManufacturerIncomplete, DoorStatus.ManufacturerReady],
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
      case DoorStatus.ManufacturerReady:
        stageStyles.push(styles.readyStage);
        statusName = 'Ready';
        break;
      case DoorStatus.ManufacturerIncomplete:
        stageStyles.push(styles.incompleteStage);
        statusName = 'Incomplete';
        break;
      default:
        stageStyles.push(styles.transferredStage);
        statusName = 'Transferred';
        break;
    }

    return (
      <View style={stageStyles}>
        <Title style={[styles.stageTitle]}>{statusName}</Title>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      <BackgroundGlitchFix />
      <PageTitle
        title="Manufactured doors"
        right={<DoorsTagFilter showTagged={showTagged} setShowTagged={setShowTagged} />}
      />

      {error && !netInfo.isInternetReachable && (
        <View style={[styles.container, styles.spinnerContainer]}>
          <Text>Cannot fetch doors when offline</Text>
        </View>
      )}
      {error && netInfo.isInternetReachable && (
        <View style={[styles.container, styles.spinnerContainer]}>
          <Text>There was an error fetching doors</Text>
        </View>
      )}
      {!error && (
        <FlatList
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
                    <Title style={[styles.text, styles.title]}>{item.doorReference || item.id}</Title>
                    <Caption style={styles.text}>{item.projectReference}</Caption>
                  </View>
                  {getDoorStage(item)}
                </Surface>
              </TouchableOpacity>
            </View>
          )}
        ></FlatList>
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
  readyStage: {
    backgroundColor: primaryColour,
  },
  incompleteStage: {
    backgroundColor: '#FF6860',
  },
  transferredStage: {
    backgroundColor: '#696A81',
  },
});
