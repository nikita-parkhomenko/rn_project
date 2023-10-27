import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Photo } from '../stores/QuestionPhotosStore';

export default function useCamera(onPhotoTaken: (photo: Photo) => void) {
  const [permissionError, setPermissionError] = useState<string | undefined>();
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);

  useEffect(() => {
    if (permissionError) {
      setShowPermissionDialog(true);
    }
  }, [permissionError]);

  const hidePermissionDialog = () => setShowPermissionDialog(false);

  // need to handle MainActivity descrtuion on Android https://docs.expo.io/versions/v39.0.0/sdk/imagepicker/#imagepickergetpendingresultasync

  const addPhoto = async (photoKey?: string) => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermission.status !== ImagePicker.PermissionStatus.GRANTED) {
      setPermissionError('We need permission to your camera in order to take photos');
      return;
    }

    const cameraRollPermission = await ImagePicker.requestCameraRollPermissionsAsync();
    if (cameraRollPermission.status !== ImagePicker.PermissionStatus.GRANTED) {
      setPermissionError('We need permission to your camera roll in order to save photos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      const split = result.uri.split('/');

      onPhotoTaken({
        uri: result.uri,
        filename: split[split.length - 1],
        photoKey,
      });
    }
  };

  return { addPhoto, permissionError, showPermissionDialog, hidePermissionDialog };
}
