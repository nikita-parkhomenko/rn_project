import React from 'react';
import usePhotosStore, { ChecklistPhoto, Photo } from '../../../stores/QuestionPhotosStore';
import PhotoEvidence from './PhotoEvidence';

interface ChecklistPhotoEvidenceProps {
  label?: string;
  questionCode: string;
}

export default function ChecklistPhotoEvidence({
  questionCode,
  label = 'Add photo evidence',
}: ChecklistPhotoEvidenceProps) {
  const addPhotos = usePhotosStore((state) => state.addPhotos);
  const removePhoto = usePhotosStore((state) => state.removePhoto);
  const photos = usePhotosStore((state) => state.photos.filter((p) => p.questionCode === questionCode));

  const onPhotoRemove = (photo: Photo) => {
    removePhoto(photo as ChecklistPhoto);
  };

  const onPhotoTaken = (photo: Photo) => {
    addPhotos([{ ...photo, questionCode } as ChecklistPhoto]);
  };

  return <PhotoEvidence label={label} photos={photos} onPhotoRemove={onPhotoRemove} onPhotoTaken={onPhotoTaken} />;
}
