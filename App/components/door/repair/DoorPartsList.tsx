// outsource dependencies
import React from 'react';
import { Surface } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';

// local dependencies
import DoorRow from '../DoorRow';
import Spinner from '../../Spinner';
import { DoorFragment } from '../../../queries';
import { backgroundColor } from '../../../constants/Style';

interface DoorPartsListProps {
  door?: DoorFragment;
  loading: boolean;
}

export default function DoorPartsList({ door, loading }: DoorPartsListProps) {
  if (loading) {
    return <Spinner />;
  }
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <Surface style={styles.surface}>
        <View style={styles.row}>
          <DoorRow title="Lock/latch" caption={door?.doorParts?.lockLatch || door?.model?.doorModelParts?.lockLatch} />
          <DoorRow title="Door closer" caption={door?.doorParts?.closer || door?.model?.doorModelParts?.closer} />
        </View>
        <View style={styles.row}>
          <DoorRow
            title="Intumescent strip"
            caption={door?.doorParts?.intumescentStrip || door?.model?.doorModelParts?.intumescentStrip}
          />
          <DoorRow title="Hinges" caption={door?.doorParts?.hinges || door?.model?.doorModelParts?.hinges} />
        </View>
        <View style={styles.row}>
          <DoorRow title="Handles" caption={door?.doorParts?.handles || door?.model?.doorModelParts?.handles} />
          <DoorRow
            title="Smoke seals"
            caption={door?.doorParts?.smokeSeals || door?.model?.doorModelParts?.smokeSeals}
          />
        </View>
        <View style={styles.row}>
          <DoorRow title="Drop seal" caption={door?.doorParts?.dropSeal || door?.model?.doorModelParts?.dropSeal} />
          <DoorRow title="Cylinder" caption={door?.doorParts?.cylinder || door?.model?.doorModelParts?.cylinder} />
        </View>
        <View style={styles.row}>
          <DoorRow title="Letterbox" caption={door?.doorParts?.letterbox || door?.model?.doorModelParts?.letterbox} />
          <DoorRow title="Spyhole" caption={door?.doorParts?.spyhole || door?.model?.doorModelParts?.spyhole} />
        </View>
        <View style={styles.row}>
          <DoorRow
            title="Threshold strip"
            caption={door?.doorParts?.thresholdStrip || door?.model?.doorModelParts?.thresholdStrip}
          />
          <DoorRow title="Keeps" caption={door?.doorParts?.keeps} />
        </View>
        <View style={styles.row}>
          <DoorRow title="Numerals" caption={door?.doorParts?.numerals} />
          <DoorRow title="Chain" caption={door?.doorParts?.chain} />
        </View>
        <View style={styles.row}>
          <DoorRow title="Weather seals" caption={door?.doorParts?.weatherSeals} />
        </View>
        <View style={styles.row}>
          <DoorRow
            title="Additional comments"
            caption={door?.doorParts?.additionalComments || door?.model?.doorModelParts?.additionalComments}
          />
        </View>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  surface: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});
