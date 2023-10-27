import AsyncStorage from '@react-native-community/async-storage';
import StorageKeys from '../constants/StorageKeys';
import { DoorAction } from '../hooks/useQuestion';
import DoorStatus from '../constants/DoorStatus';

export async function GetDoorBeingInstalled(doorid: string) {
  return GetDoorBeingActioned(DoorStatus.InstallerInstalling, doorid);
}

export async function GetDoorBeingInspected(doorid: string) {
  return GetDoorBeingActioned(DoorStatus.Inspecting, doorid);
}

export async function GetDoorBeingActioned(doorStatusToLookFor: string, doorid?: string) {
  if (doorid !== undefined && doorid !== null) {
    const doorCheckListsInProgress = await AsyncStorage.getItem(StorageKeys.CheckListsInProgress);
    if (doorCheckListsInProgress) {
      const allDoorCheckLists: DoorAction[] = JSON.parse(doorCheckListsInProgress);
      const checkListForThisDoor: DoorAction | undefined = allDoorCheckLists.find(
        (d) => d.doorId === doorid && d.status === doorStatusToLookFor
      );
      return checkListForThisDoor;
    }
  }
  return undefined;
}

export async function GetAllDoorCheckLists() {
  const doorCheckListsInProgress = await AsyncStorage.getItem(StorageKeys.CheckListsInProgress);
  if (doorCheckListsInProgress) {
    return JSON.parse(doorCheckListsInProgress);
  }
  return [];
}

export async function GetAllDoorInstallerCheckLists() {
  const doorCheckListsInProgress = await AsyncStorage.getItem(StorageKeys.CheckListsInProgress);
  if (doorCheckListsInProgress) {
    const allDoorCheckLists: DoorAction[] = JSON.parse(doorCheckListsInProgress);
    return allDoorCheckLists.filter((door) => door.status === DoorStatus.InstallerInstalling);
  }
  return [];
}

export async function GetAllDoorInspectionCheckLists() {
  const doorCheckListsInProgress = await AsyncStorage.getItem(StorageKeys.CheckListsInProgress);
  if (doorCheckListsInProgress) {
    const allDoorCheckLists: DoorAction[] = JSON.parse(doorCheckListsInProgress);
    return allDoorCheckLists.filter((door) => door.status === DoorStatus.Inspecting);
  }
  return [];
}
