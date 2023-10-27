import create from 'zustand';
import QuestionCodes from '../constants/QuestionCodes';

export interface Photo {
  uri: string;
  filename: string;
  // photoKey is specific for PhotoEvidenceGapsSlabFrameTolerance so we know which photo is assigned to left jamb etc.
  photoKey?: string;
}

export interface ChecklistPhoto extends Photo {
  questionCode: QuestionCodes;
}

type PhotosState = {
  photos: ChecklistPhoto[];
  addPhotos: (newPhotos: ChecklistPhoto[]) => void;
  removePhoto: (photo: ChecklistPhoto) => void;
  clearPhotos: () => void;
};

const usePhotosStore = create<PhotosState>((set) => ({
  photos: [],
  addPhotos: (newPhotos: ChecklistPhoto[]) => set((state) => ({ photos: [...state.photos, ...newPhotos] })),
  removePhoto: (photo: ChecklistPhoto) =>
    set((state) => ({ photos: state.photos.filter((p) => p.filename !== photo.filename) })),
  clearPhotos: () => set(() => ({ photos: [] })),
}));

export default usePhotosStore;
