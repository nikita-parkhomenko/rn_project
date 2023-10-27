import React from 'react';
import { StyleSheet, View } from 'react-native';
import QuestionCodes from '../../../constants/QuestionCodes';
import { useRemovePhoto } from '../../../hooks/useRemovePhoto';
import usePhotosStore from '../../../stores/QuestionPhotosStore';
import PhotoEvidenceRemoveDialog from '../common/PhotoEvidenceRemoveDialog';
import RequiredPhoto from '../common/RequiredPhoto';

export default function PhotoEvidenceGapsSlabFrameToleranceInspection() {
  const { onPhotoPress, showDelete, onRemoveModalClose } = useRemovePhoto();
  const photos = usePhotosStore((state) =>
    state.photos.filter((p) => p.questionCode === QuestionCodes.GapsSlabFrameToleranceInsp)
  );

  const leftJambPhoto = photos.find((p) => p.photoKey === 'leftJamb');
  const rightJambPhoto = photos.find((p) => p.photoKey === 'rightJamb');
  const headPhoto = photos.find((p) => p.photoKey === 'head');

  return (
    <View style={styles.container}>
      <RequiredPhoto
        title="Left jamb"
        photoKey="leftJamb"
        photo={leftJambPhoto}
        onPress={() => onPhotoPress(leftJambPhoto!)}
        questionCode={QuestionCodes.GapsSlabFrameToleranceInsp}
      />
      <RequiredPhoto
        title="Right jamb"
        photoKey="rightJamb"
        photo={rightJambPhoto}
        onPress={() => onPhotoPress(rightJambPhoto!)}
        questionCode={QuestionCodes.GapsSlabFrameToleranceInsp}
      />
      <RequiredPhoto
        title="Head"
        photoKey="head"
        photo={headPhoto}
        onPress={() => onPhotoPress(headPhoto!)}
        questionCode={QuestionCodes.GapsSlabFrameToleranceInsp}
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
