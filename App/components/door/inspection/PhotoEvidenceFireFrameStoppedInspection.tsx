import React from 'react';
import { StyleSheet, View } from 'react-native';
import QuestionCodes from '../../../constants/QuestionCodes';
import { useRemovePhoto } from '../../../hooks/useRemovePhoto';
import usePhotosStore from '../../../stores/QuestionPhotosStore';
import PhotoEvidenceRemoveDialog from '../common/PhotoEvidenceRemoveDialog';
import RequiredPhoto from '../common/RequiredPhoto';

export default function PhotoEvidenceFireFrameStoppedInspection() {
  const { onPhotoPress, showDelete, onRemoveModalClose } = useRemovePhoto();
  const photos = usePhotosStore((state) =>
    state.photos.filter((p) => p.questionCode === QuestionCodes.FrameFireStoppedInsp)
  );

  const firstPhoto = photos.find((p) => p.photoKey === 'frameFireStopped1');
  const secondPhoto = photos.find((p) => p.photoKey === 'frameFireStopped2');
  const thridPhoto = photos.find((p) => p.photoKey === 'frameFireStopped3');

  return (
    <View style={styles.container}>
      <RequiredPhoto
        title="Photo 1"
        photoKey="frameFireStopped1"
        photo={firstPhoto}
        onPress={() => onPhotoPress(firstPhoto!)}
        questionCode={QuestionCodes.FrameFireStoppedInsp}
      />
      <RequiredPhoto
        title="Photo 2"
        photoKey="frameFireStopped2"
        photo={secondPhoto}
        onPress={() => onPhotoPress(secondPhoto!)}
        questionCode={QuestionCodes.FrameFireStoppedInsp}
      />
      <RequiredPhoto
        title="Photo 3"
        photoKey="frameFireStopped3"
        photo={thridPhoto}
        onPress={() => onPhotoPress(thridPhoto!)}
        questionCode={QuestionCodes.FrameFireStoppedInsp}
      />
      <PhotoEvidenceRemoveDialog visible={showDelete} onClose={onRemoveModalClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -10,
  },
});
