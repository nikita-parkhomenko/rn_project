import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';
import QuestionCodes from '../../../constants/QuestionCodes';
import useCamera from '../../../hooks/useCamera';
import usePhotosStore, { Photo } from '../../../stores/QuestionPhotosStore';
import AddPhotoButton from '../common/AddPhotoButton';
import CameraPermissionDialog from './CameraPermissionDialog';

interface RequiredPhotoProps {
  title: string;
  photoKey: string;
  photo?: Photo;
  onPress?: () => void;
  questionCode: QuestionCodes;
}

export default function RequiredPhoto({ title, photoKey, photo, onPress, questionCode }: RequiredPhotoProps) {
  const addPhotos = usePhotosStore((state) => state.addPhotos);
  const { addPhoto, permissionError, showPermissionDialog, hidePermissionDialog } = useCamera((photo) => {
    addPhotos([{ ...photo, questionCode }]);
  });

  return (
    <View style={styles.photoContainer}>
      <Text>{title}</Text>
      {photo && (
        <TouchableRipple onPress={onPress}>
          <Image source={{ uri: photo.uri }} style={[styles.photo, styles.thumbnail]} />
        </TouchableRipple>
      )}
      {!photo && <AddPhotoButton onPress={() => addPhoto(photoKey)} style={styles.photo} />}
      <CameraPermissionDialog visible={showPermissionDialog} hide={hidePermissionDialog} message={permissionError!} />
    </View>
  );
}

const styles = StyleSheet.create({
  photoContainer: {
    marginHorizontal: 8,
  },
  photo: {
    marginTop: 15,
    marginBottom: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
});
