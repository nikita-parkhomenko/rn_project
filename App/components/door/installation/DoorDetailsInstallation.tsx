import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import DoorStatus from '../../../constants/DoorStatus';
import Roles from '../../../constants/Roles';
import { backgroundColor } from '../../../constants/Style';
import useAuth from '../../../hooks/useAuth';
import { DoorFragment } from '../../../queries';
import Routes from '../../../routing/Routes';
import Button from '../../Button';
import ProtectedSection from '../../ProtectedSection';
import Spinner from '../../Spinner';
import DoorDetailsCard from '../DoorDetailsCard';
import DoorLeaf from '../DoorLeaf';
import InstallationStart from './InstallationStart';
import { GetDoorBeingInstalled } from '../../../services/DoorAsyncStorageHelperService';

interface DoorDetailsProps {
  door?: DoorFragment;
  loading: boolean;
  onAssignTag: () => void;
  onInstallationStart: () => void;
}

export default function DoorDetailsInstallation({ loading, door, onAssignTag, onInstallationStart }: DoorDetailsProps) {
  const [showStartInstallation, setShowStartInstallation] = useState(false);
  const { hasAnyRole } = useAuth();
  const navigation = useNavigation();
  const showRequiresInstallationSignOff =
    door?.status.code === DoorStatus.InstallerRequiresSignOff && hasAnyRole([Roles.Installer, Roles.InstallerAdmin]);
  const hasSecondDoorLeaf = Boolean(
    (door && door.leaf2AccousticRating) || door?.leaf2CoreSupplier || door?.leaf2Height || door?.leaf2Width
  );

  useEffect(() => {
    async function isInstallationInProgress() {
      try {
        //never show the start installation button if the door is ready for sign off
        if (showRequiresInstallationSignOff) {
          setShowStartInstallation(false);
        } else {
          //determine whether to show the start installation button based on whether this particular door is already being installed
          const doorBeingInstalled = await GetDoorBeingInstalled(door!.id);
          setShowStartInstallation(Boolean(doorBeingInstalled) === false);
        }
      } catch {}
    }

    const doorStatusToStartInstallation = [DoorStatus.InstallerReady, DoorStatus.InstallerFailedSignOff];
    if (
      door &&
      doorStatusToStartInstallation.includes(door.status.code as DoorStatus) &&
      hasAnyRole([Roles.Installer, Roles.InstallerAdmin])
    ) {
      isInstallationInProgress();
    }
  }, [door, hasAnyRole]);

  const installationStarted = () => {
    setShowStartInstallation(false);
    onInstallationStart();
  };

  const onSignOffStartedPressed = () => {
    navigation.navigate(Routes.SignOffInstallation, { doorId: door!.id });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      {door && (
        <>
          <ProtectedSection roles={[Roles.InstallerAdmin, Roles.Installer]}>
            {showStartInstallation && !showRequiresInstallationSignOff && (
              <InstallationStart door={door} onInstallationStart={installationStarted} />
            )}
            {showRequiresInstallationSignOff && (
              <View style={styles.signOffbutton}>
                <Button onPress={onSignOffStartedPressed}>Sign off installation</Button>
              </View>
            )}
          </ProtectedSection>
          <DoorDetailsCard door={door} onAssignTag={onAssignTag} />
          <DoorLeaf
            leafNumber={1}
            acousticRating={door.leaf1AccousticRating}
            coreSupplier={door.model?.coreSupplier || door.leaf1CoreSupplier}
            width={door.leaf1Width}
            height={door.leaf1Height}
          />
          {hasSecondDoorLeaf && (
            <DoorLeaf
              leafNumber={2}
              acousticRating={door.leaf2AccousticRating}
              coreSupplier={door.model?.coreSupplier || door.leaf2CoreSupplier}
              width={door.leaf2Width}
              height={door.leaf2Height}
            />
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  signOffbutton: {
    padding: 30,
  },
});
