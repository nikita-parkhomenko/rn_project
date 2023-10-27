// outsource dependencies
import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View, StyleSheet, ScrollView } from 'react-native';

// local dependencies
import Routes from '../routing/Routes';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import { Photo } from '../stores/QuestionPhotosStore';
import { RepairStackParamList } from '../routing/RepairStackScreen';
import PhotoEvidence from '../components/door/common/PhotoEvidence';
import { backgroundColor, secondaryColour } from '../constants/Style';

type LogRepairNavigationProps = StackScreenProps<RepairStackParamList, Routes.RepairDoors>;

export default function LogRepair({ navigation, route }: LogRepairNavigationProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { doorId } = route.params;

  const onPhotoRemove = (photo: Photo) => {
    setPhotos((prev) => prev.filter((p) => p.uri !== photo.uri));
  };

  const onPhotoTaken = (photo: Photo) => {
    setPhotos((prev) => [...prev, photo]);
  };

  return (
    <View style={styles.container}>
      <PageTitle title="Add photo evidence" />
      <ScrollView>
        <View style={styles.wrapper}>
          <PhotoEvidence photos={photos} onPhotoRemove={onPhotoRemove} onPhotoTaken={onPhotoTaken} />
        </View>
      </ScrollView>
      <View style={styles.button}>
        <Button disabled={!photos.length} onPress={() => navigation.navigate(Routes.FinishRepair, { photos, doorId })}>
          Finish repair
        </Button>
      </View>
      <View style={styles.button}>
        <Button style={styles.retireButton} onPress={() => navigation.navigate(Routes.RetireDoorRecord, { doorId })}>
          Retire Door
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  wrapper: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  retireButton: {
    backgroundColor: secondaryColour,
  },
  photo: {
    marginTop: 15,
    marginBottom: 10,
  },
});
