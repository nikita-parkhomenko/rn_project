import React from 'react';
import { StyleSheet, View } from 'react-native';
import QuestionCodes from '../../../constants/QuestionCodes';
import { useRemovePhoto } from '../../../hooks/useRemovePhoto';
import usePhotosStore from '../../../stores/QuestionPhotosStore';
import PhotoEvidenceRemoveDialog from '../common/PhotoEvidenceRemoveDialog';
import RequiredPhoto from '../common/RequiredPhoto';

export default function PhotoEvidenceIsDoorComplete() {
  const { onPhotoPress, showDelete, onRemoveModalClose } = useRemovePhoto();
  const photos = usePhotosStore((state) => state.photos.filter((p) => p.questionCode === QuestionCodes.DoorComplete));

  const insidePhoto = photos.find((p) => p.photoKey === 'inside');
  const outsidePhoto = photos.find((p) => p.photoKey === 'outside');

  return (
    <View style={styles.container}>
      <RequiredPhoto
        title="Inside"
        photoKey="inside"
        photo={insidePhoto}
        onPress={() => onPhotoPress(insidePhoto!)}
        questionCode={QuestionCodes.DoorComplete}
      />
      <RequiredPhoto
        title="Outside"
        photoKey="outside"
        photo={outsidePhoto}
        onPress={() => onPhotoPress(outsidePhoto!)}
        questionCode={QuestionCodes.DoorComplete}
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
