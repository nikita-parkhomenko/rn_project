import { useNetInfo } from '@react-native-community/netinfo';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Subheading, Text } from 'react-native-paper';
import { TabView } from 'react-native-tab-view';
import BackgroundGlitchFix from '../components/BackgroundGlitchFix';
import CustomTabBar from '../components/CustomTabBar';
import DoorChecklistInstallation from '../components/door/installation/DoorChecklistInstallation';
import DoorChecklistInspection from '../components/door/inspection/DoorChecklistInspection';
import DoorChecksViewOnly from '../components/door/DoorChecksViewOnly';
import DoorDetailsInstallation from '../components/door/installation/DoorDetailsInstallation';
import DoorDetailsInspection from '../components/door/inspection/DoorDetailsInspection';
import DoorGuide from '../components/door/DoorGuide';
import DoorNotFound from '../components/door/DoorNotFound';
import FailedToAssignTagDialog from '../components/door/FailedToAssignTagDialog';
import PageTitle from '../components/PageTitle';
import DocumentTypes from '../constants/DocumentTypes';
import DoorStatus from '../constants/DoorStatus';
import { backgroundColor } from '../constants/Style';
import useDoor from '../hooks/useDoor';
import useScan from '../hooks/useScan';
import useSnackbar from '../hooks/useSnackbar';
import { useAssignDoorTagMutation } from '../queries';
import { DoorsStackParamList } from '../routing/DoorsStackScreen';
import Routes from '../routing/Routes';
import { GetDoorBeingInstalled, GetDoorBeingInspected } from '../services/DoorAsyncStorageHelperService';
import DoorPartsList from '../components/door/repair/DoorPartsList';
import DoorDocuments from '../components/door/repair/DoorDocuments';
import DoorDetailsRepair from '../components/door/repair/DoorDetailsRepair';

const initialLayout = { width: Dimensions.get('window').width };

type DoorProps = StackScreenProps<DoorsStackParamList, Routes.Door>;

export default function Door({ route, navigation }: DoorProps) {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [inspectingDoor, setInspectingDoor] = useState<boolean>(false);
  const [completedQuestionCount, setCompletedQuestionCount] = useState<string>();
  const [installationGuideDocumentId, setInstallationGuideDocumentId] = useState<string | undefined>();
  const [doorDocuments, setDoorDocuments] = useState<any>([]);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: 'details', title: 'Details' },
    { key: 'guide', title: 'Guide' },
  ]);
  const netInfo = useNetInfo();
  const [assignDoorTag, { loading: saving, data: savedDoor }] = useAssignDoorTagMutation();
  const [updateDoor, setUpdateDoor] = useState<boolean>(true);
  const { loading, error, door } = useDoor(route, updateDoor);
  const { doorScanned } = route.params;

  const { showSnackbar } = useSnackbar();
  const { scanNfc, stopScan } = useScan();

  useEffect(() => {
    if (door?.status?.code === DoorStatus.RequiresRepair) {
      setRoutes((prevRouts) => [...prevRouts, { key: 'parts', title: 'Parts List' }, { key: 'docs', title: 'Docs' }]);
    }
  }, [door]);

  const doorId = door?.id;
  useEffect(() => {
    let timeout: any;
    if (savedDoor) {
      timeout = setTimeout(() => {
        showSnackbar(`Successfully assigned tag to ${doorId}`);
        navigation.pop();
      }, 1500);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [savedDoor, navigation, doorId, showSnackbar]);

  useEffect(() => {
    if (door) {
      if (door.documents && door.documents.length > 0) {
        setDoorDocuments(door.documents);
        const installationGuide = door.documents.find((d) => d.documentType.code === DocumentTypes.InstallationGuide);
        if (installationGuide) {
          setInstallationGuideDocumentId(installationGuide.id);
        }
      }
      if (door.model?.documents && door.model?.documents?.length > 0) {
        setDoorDocuments(door.model.documents);
        const installationGuide = door.model.documents.find(
          (d) => d.documentType.code === DocumentTypes.InstallationGuide
        );
        if (installationGuide) {
          setInstallationGuideDocumentId(installationGuide.id);
        }
      }
    }
  }, [door]);

  const setChecksTab = (tabKey: string) => {
    //remove the checks tab first (this can be of different keys, so use the title)
    setRoutes(routes.filter((r) => r.title !== 'Checks'));
    //add the new checks tab in place (eg, might be the inspection checks, or the installation view only checklist)
    if (!routes.find((r) => r.key === tabKey)) {
      setRoutes((prev) => [...prev, { key: tabKey, title: 'Checks' }]);
    }
    setInspectingDoor(tabKey.toLowerCase().includes('inspect'));
  };

  //if the door is being installed, then add or remove the different checklist types (view only or edit) based on the door status
  useEffect(() => {
    async function isDoorBeingInstalled() {
      if (door?.status?.code === DoorStatus.InstallerRequiresSignOff) {
        //set the 'checks' tab for the read only installer view of the checklist
        setChecksTab('viewinstallationchecks');
      } else if (door?.status?.code === DoorStatus.InstallerInstalling) {
        //always show checklist if the installation is in the middle of being installed
        setChecksTab('installationchecks');
      } else {
        const doorIsBeingInstalled = await GetDoorBeingInstalled(door!.id);
        if (doorIsBeingInstalled && door?.status?.code !== DoorStatus.InstallerRequiresSignOff) {
          //set the 'checks' tab for the edit installer view of the checklist
          setChecksTab('installationchecks');
        }
      }
    }

    if (door) {
      isDoorBeingInstalled();
    }
  }, [door]);

  //if the door is being inspected, then add or remove the different checklist types (view only or edit) based on the door status
  useEffect(() => {
    async function isDoorBeingInspected() {
      if (door?.status?.code === DoorStatus.Inspecting) {
        //always show checklist if the installation is in the middle of being installed
        setChecksTab('inspectionchecks');
      } else {
        const doorIsBeingInspected = await GetDoorBeingInspected(door!.id);
        if (doorIsBeingInspected) {
          //TODO: ADD IN ONCE INSPETIONREQSIGNOFF STATUS AVAILABLE: && door?.status?.code !== DoorStatus.InspectionRequiresSignOff) {
          //set the 'checks' tab for the edit view of the inspection checklist
          setChecksTab('inspectionchecks');
        }
      }
    }

    if (door) {
      isDoorBeingInspected();
    }
  }, [door]);

  const onInstallationStart = () => {
    setChecksTab('installationchecks');
    //set the tab control to the Checks tab
    setIndex(2);
    showSnackbar('Installation started');
  };

  const onInspectionStart = () => {
    setChecksTab('inspectionchecks');
    //set the tab control to the Checks tab
    setIndex(2);
    showSnackbar('Inspection started');
  };

  const onChecklistComplete = () => {
    //force the door to reload in the useDoor hook (we have passed it the setUpdateDoor so that the two forms share this state)
    //need to toggle it to work
    setUpdateDoor(false);
    setUpdateDoor(true);
    //set the tab control to the details tab
    setIndex(0);
  };

  const renderScene = ({ route }: any) => {
    const doorStatusToShowInspectionDetails = [
      DoorStatus.Inspecting,
      DoorStatus.InspectionDue,
      DoorStatus.InspectionFailedSignOff,
      DoorStatus.InspectionOverdue,
      DoorStatus.InspectionRequiresSignOff,
    ];
    switch (route.key) {
      case 'details':
        if (door?.status.code === DoorStatus.RequiresRepair) {
          return (
            <DoorDetailsRepair
              door={door}
              loading={loading || saving}
              onAssignTag={onAssignTag}
              doorScanned={doorScanned}
            />
          );
        }
        if (!doorStatusToShowInspectionDetails.includes(door?.status.code as DoorStatus)) {
          return (
            <DoorDetailsInstallation
              loading={loading || saving}
              door={door}
              onAssignTag={onAssignTag}
              onInstallationStart={onInstallationStart}
            />
          );
        }
        if (doorStatusToShowInspectionDetails.includes(door?.status.code as DoorStatus)) {
          return (
            <DoorDetailsInspection
              loading={loading || saving}
              door={door}
              onAssignTag={onAssignTag}
              onInspectionStart={onInspectionStart}
            />
          );
        }
        break;
      case 'guide':
        return <DoorGuide documentId={installationGuideDocumentId} />;
      case 'installationchecks':
        return (
          <DoorChecklistInstallation
            doorId={door?.id}
            onQuestionAnswered={setCompletedQuestionCount}
            onInstallationComplete={onChecklistComplete}
          />
        );
      case 'viewinstallationchecks':
        return <DoorChecksViewOnly doorId={door!.id} />;
      case 'inspectionchecks':
        return (
          <DoorChecklistInspection
            doorId={door?.id}
            onQuestionAnswered={setCompletedQuestionCount}
            onInspectionComplete={onChecklistComplete}
          />
        );
      case 'parts':
        if (door?.status.code === DoorStatus.RequiresRepair) {
          return <DoorPartsList loading={loading || saving} door={door} />;
        }
        break;
      case 'docs':
        return <DoorDocuments documents={doorDocuments} />;
      default:
        return null;
    }
  };

  const onAssignTag = (): void => {
    scanNfc({
      title: 'Assign tag',
      message: 'Position device next to NFC Pin to assign tag to door',
      onScan: async (tagId) => {
        try {
          await assignDoorTag({
            variables: {
              id: door!.id,
              tag: tagId,
            },
          });
          stopScan();
        } catch (e) {
          if (e.graphQLErrors && e.graphQLErrors.length > 0) {
            setErrorMessage(e.graphQLErrors[0].message);
          } else {
            setErrorMessage('An unexpected error occurred');
          }
        }
      },
    });
  };

  const doorNotFound = error && error.graphQLErrors && error.graphQLErrors[0]?.extensions?.code === 'DOOR_NOT_FOUND';
  // swipe is disabled on the guide tab because otherwise you can't pan the pdf
  return (
    <View style={styles.container}>
      <BackgroundGlitchFix />
      {index !== 2 && <PageTitle title="View door" />}
      {index === 2 && inspectingDoor === false && (
        <PageTitle title="Installation checks" right={<Subheading>{completedQuestionCount}</Subheading>} />
      )}
      {index === 2 && inspectingDoor === true && (
        <PageTitle title="Inspection checks" right={<Subheading>{completedQuestionCount}</Subheading>} />
      )}

      {error && !netInfo.isInternetReachable && !doorNotFound && (
        <View style={[styles.container, styles.spinnerContainer]}>
          <Text>Cannot fetch door details when offline</Text>
        </View>
      )}
      {error && netInfo.isInternetReachable && !doorNotFound && (
        <View style={[styles.container, styles.spinnerContainer]}>
          <Text>There was an error fetching this door</Text>
        </View>
      )}
      {doorNotFound && <DoorNotFound />}
      {!error && (
        <TabView
          renderTabBar={CustomTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          swipeEnabled={false}
        />
      )}
      <FailedToAssignTagDialog
        visible={!!errorMessage}
        hide={() => setErrorMessage(undefined)}
        errorMessage={errorMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
