import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import useCamera from '../../../hooks/useCamera';
import CameraPermissionDialog from './CameraPermissionDialog';
import PhotoEvidenceRemoveDialog from './PhotoEvidenceRemoveDialog';
import AddPhotoButton from './AddPhotoButton';
import { Photo } from '../../../stores/QuestionPhotosStore';

interface PhotoEvidenceProps {
  label?: string;
  photos: any[];
  onPhotoRemove: <T extends Photo>(photo: T) => void;
  onPhotoTaken: <T extends Photo>(photo: T) => void;
}

export default function PhotoEvidence({
  photos,
  onPhotoRemove,
  onPhotoTaken,
  label = 'Add photo evidence',
}: PhotoEvidenceProps) {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any>();
  const { addPhoto, permissionError, showPermissionDialog, hidePermissionDialog } = useCamera(onPhotoTaken);

  const onPhotoPress = (photo: any) => {
    setSelectedPhoto(photo);
    setShowRemoveDialog(true);
  };

  const onRemoveModalClose = (result: boolean) => {
    if (result) {
      onPhotoRemove(selectedPhoto);
    }
    setShowRemoveDialog(false);
    setSelectedPhoto(undefined);
  };

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <View style={styles.photoRow}>
        {photos.map((p, i) => (
          <TouchableRipple key={i} onPress={() => onPhotoPress(p)}>
            <Image style={[styles.photo, styles.thumbnail]} source={{ uri: p.uri }} />
          </TouchableRipple>
        ))}
        <AddPhotoButton onPress={() => addPhoto()} style={styles.photo} />
      </View>
      <PhotoEvidenceRemoveDialog visible={showRemoveDialog} onClose={onRemoveModalClose} />
      <CameraPermissionDialog visible={showPermissionDialog} hide={hidePermissionDialog} message={permissionError!} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  photoRow: {
    marginTop: 15,
    marginHorizontal: -8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photo: {
    marginHorizontal: 8,
    marginBottom: 16,
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
});
