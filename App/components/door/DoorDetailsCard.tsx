import { useNetInfo } from '@react-native-community/netinfo';
import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Caption, Surface, Title } from 'react-native-paper';
import { secondaryColour } from '../../constants/Style';
import { DoorFragment } from '../../queries';
import Button from '../Button';

interface DoorDetailsProps {
  door: DoorFragment;
  onAssignTag: () => void;
}

export default function DoorDetailsCard({ door, onAssignTag }: DoorDetailsProps) {
  const netInfo = useNetInfo();

  const assignTag = async () => {
    if (Constants.appOwnership === 'expo') {
      alert('NFC not supported on Expo');
    }

    if (!netInfo.isInternetReachable) {
      alert('You must be online to assign a tag');
      return;
    }

    if (onAssignTag) {
      onAssignTag();
    }
  };

  return (
    <Surface style={styles.surface}>
      <View style={styles.row}>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>DDS Id</Title>
          <Caption style={styles.text}>{door.id}</Caption>
        </View>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>Project reference</Title>
          <Caption style={styles.text}>{door.projectReference ?? '-'}</Caption>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>Door Reference</Title>
          <Caption style={styles.text}>{door.doorReference ?? '-'}</Caption>
        </View>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>Door model</Title>
          <Caption style={styles.text}>{door.model?.name ?? '-'}</Caption>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>FD rating</Title>
          <Caption style={styles.text}>{door.model?.fdRating?.value || door.fdRating?.value || '-'}</Caption>
        </View>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>Tag ID</Title>
          {door.tagId && <Caption style={styles.text}>{door.tagId}</Caption>}
          {!door.tagId && (
            <Button onPress={assignTag} color={secondaryColour}>
              Assign tag
            </Button>
          )}
        </View>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  detail: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  title: {
    fontWeight: '700',
  },
});
