import AsyncStorage from '@react-native-community/async-storage';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import DoorStatus from '../../../constants/DoorStatus';
import StorageKeys from '../../../constants/StorageKeys';
import useScan from '../../../hooks/useScan';
import useSnackbar from '../../../hooks/useSnackbar';
import { DoorFragment, useStartInspectionMutation } from '../../../queries';
import { DoorsStackParamList } from '../../../routing/DoorsStackScreen';
import Routes from '../../../routing/Routes';
import Button from '../../Button';
import DoorNotAccessibleButton from './DoorNotAccessibleButton';

interface InspectionStartProps {
  door: DoorFragment;
  onInspectionStart: () => void;
}

export default function InspectionStart({ door, onInspectionStart }: InspectionStartProps) {
  const { showSnackbar } = useSnackbar();
  const [startInspectionMutation] = useStartInspectionMutation();
  const { scanNfc, stopScan } = useScan();
  const route = useRoute<RouteProp<DoorsStackParamList, Routes.Door>>();
  const { doorScanned } = route.params;

  const doStartInspection = async () => {
    const doorId = door.id;
    const inspectionsInProgress = await AsyncStorage.getItem(StorageKeys.CheckListsInProgress);
    if (inspectionsInProgress) {
      try {
        const inProgressInspections = JSON.parse(inspectionsInProgress);
        inProgressInspections.push({
          doorId,
          site: '',
          status: DoorStatus.Inspecting,
        });
        await AsyncStorage.setItem(StorageKeys.CheckListsInProgress, JSON.stringify(inProgressInspections));
      } catch {
        const values = [{ doorId, site: '', status: DoorStatus.Inspecting }];
        await AsyncStorage.setItem(StorageKeys.CheckListsInProgress, JSON.stringify(values));
      }
    } else {
      const values = [{ doorId, site: '', status: DoorStatus.Inspecting }];
      await AsyncStorage.setItem(StorageKeys.CheckListsInProgress, JSON.stringify(values));
    }
    try {
      await startInspectionMutation({
        variables: {
          doorId,
        },
      });
      onInspectionStart();
    } catch (e) {
      console.log(e);
      showSnackbar('There was an error starting the inspection');
    }
  };

  const startInspection = async () => {
    if (!doorScanned && !__DEV__) {
      scanNfc({
        onScan: (tagId) => {
          stopScan();
          if (tagId === door.tagId) {
            doStartInspection();
          } else {
            showSnackbar('The pin scanned does not match the one assigned to this door');
          }
        },
      });
    } else {
      doStartInspection();
    }
  };

  return (
    <View style={styles.container}>
      <Button style={styles.margin} onPress={startInspection}>
        Start inspection
      </Button>
      <DoorNotAccessibleButton doorId={door.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingBottom: 45,
    zIndex: 999, // needed to prevent details clipping autocomplete dropdown
  },
  margin: {
    marginTop: 10,
    marginBottom: 15,
  },
});
