// outsource dependencies
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, View } from 'react-native';

// local dependencies
import Button from '../../Button';
import DoorLeaf from '../DoorLeaf';
import Spinner from '../../Spinner';
import useScan from '../../../hooks/useScan';
import Routes from '../../../routing/Routes';
import Roles from '../../../constants/Roles';
import { DoorFragment } from '../../../queries';
import DoorDetailsCard from '../DoorDetailsCard';
import useSnackbar from '../../../hooks/useSnackbar';
import ProtectedSection from '../../ProtectedSection';
import DoorStatus from '../../../constants/DoorStatus';
import { backgroundColor } from '../../../constants/Style';

interface DoorDetailsProps {
  door?: DoorFragment;
  loading: boolean;
  onAssignTag: () => void;
  doorScanned?: boolean;
}

export default function DoorDetailsInspection({ loading, door, onAssignTag, doorScanned }: DoorDetailsProps) {
  const navigation = useNavigation();
  const { showSnackbar } = useSnackbar();
  const { scanNfc, stopScan } = useScan();
  const hasSecondDoorLeaf = Boolean(
    (door && door.leaf2AccousticRating) || door?.leaf2CoreSupplier || door?.leaf2Height || door?.leaf2Width
  );
  const showStartRepair = door?.status.code === DoorStatus.RequiresRepair;

  const scanDoor = async () => {
    if (!doorScanned && !__DEV__) {
      scanNfc({
        onScan: (tagId) => {
          stopScan();
          if (tagId === door?.tagId) {
            startRepair();
          } else {
            showSnackbar('The pin scanned does not match the one assigned to this door');
          }
        },
      });
    } else {
      startRepair();
    }
  };

  const startRepair = () => {
    showSnackbar('Repair Started');
    navigation.navigate(Routes.LogRepair, { doorId: door!.id });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      {door && (
        <>
          <ProtectedSection roles={[Roles.ServiceEngineer, Roles.ServiceEngineerAdmin]}>
            {showStartRepair && (
              <View style={styles.button}>
                <Button onPress={startRepair}>Start Repair</Button>
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
  button: {
    padding: 30,
  },
});
