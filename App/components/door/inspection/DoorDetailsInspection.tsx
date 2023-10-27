import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import DoorStatus from '../../../constants/DoorStatus';
import Roles from '../../../constants/Roles';
import { backgroundColor } from '../../../constants/Style';
import useAuth from '../../../hooks/useAuth';
import { DoorFragment } from '../../../queries';
import Button from '../../Button';
import ProtectedSection from '../../ProtectedSection';
import Spinner from '../../Spinner';
import DoorDetailsCard from '../DoorDetailsCard';
import DoorLeaf from '../DoorLeaf';
import InspectionStart from './InspectionStart';
import { GetDoorBeingInspected } from '../../../services/DoorAsyncStorageHelperService';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../../routing/Routes';

interface DoorDetailsProps {
  door?: DoorFragment;
  loading: boolean;
  onAssignTag: () => void;
  onInspectionStart: () => void;
}

export default function DoorDetailsInspection({ loading, door, onAssignTag, onInspectionStart }: DoorDetailsProps) {
  const [showStartInspection, setShowStartInspection] = useState(false);
  const { hasAnyRole } = useAuth();
  const navigation = useNavigation();
  const showRequiresInspectionSignOff =
    door?.status.code === DoorStatus.InspectionRequiresSignOff && hasAnyRole([Roles.Inspector, Roles.InspectorAdmin]);
  const hasSecondDoorLeaf = Boolean(
    (door && door.leaf2AccousticRating) || door?.leaf2CoreSupplier || door?.leaf2Height || door?.leaf2Width
  );

  useEffect(() => {
    async function isInspectionInProgress() {
      try {
        //never show the start inspection button if the door is ready for sign off
        if (showRequiresInspectionSignOff) {
          setShowStartInspection(false);
        } else {
          //determine whether to show the start inspection button based on whether this particular door is already being inspected
          const doorBeingInspected = await GetDoorBeingInspected(door!.id);
          setShowStartInspection(Boolean(doorBeingInspected) === false);
        }
      } catch {}
    }

    const doorStatusToStartInspection = [
      DoorStatus.InspectionDue,
      DoorStatus.InspectionOverdue,
      DoorStatus.InspectionFailedSignOff,
    ];

    if (
      door &&
      doorStatusToStartInspection.includes(door.status.code as DoorStatus) &&
      hasAnyRole([Roles.Inspector, Roles.InspectorAdmin])
    ) {
      isInspectionInProgress();
    }
  }, [door, hasAnyRole, showRequiresInspectionSignOff]);

  const inspectionStarted = () => {
    setShowStartInspection(false);
    onInspectionStart();
  };

  const onSignOffPressed = () => {
    navigation.navigate(Routes.SignOffInspection, { doorId: door!.id });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      {door && (
        <>
          <ProtectedSection roles={[Roles.InspectorAdmin, Roles.Inspector]}>
            {showStartInspection && !showRequiresInspectionSignOff && (
              <InspectionStart door={door} onInspectionStart={inspectionStarted} />
            )}
            {showRequiresInspectionSignOff && (
              <View style={styles.signOffbutton}>
                <Button onPress={onSignOffPressed}>Sign off inspection</Button>
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
