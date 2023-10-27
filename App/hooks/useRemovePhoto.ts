import { useState } from 'react';
import usePhotosStore, { Photo } from '../stores/QuestionPhotosStore';

export function useRemovePhoto() {
  const [showDelete, setShowDelete] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | undefined>();
  const removePhoto = usePhotosStore((state) => state.removePhoto);

  const onRemoveModalClose = (result: boolean) => {
    if (result) {
      removePhoto(selectedPhoto!);
    }
    setShowDelete(false);
    setSelectedPhoto(undefined);
  };

  const onPhotoPress = (photo: Photo) => {
    setSelectedPhoto(photo);
    setShowDelete(true);
  };

  return { showDelete, onRemoveModalClose, onPhotoPress };
}
