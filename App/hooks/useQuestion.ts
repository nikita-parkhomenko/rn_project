import AsyncStorage from '@react-native-community/async-storage';
import { ReactNativeFile } from 'apollo-upload-client';
import { useCallback, useEffect, useState } from 'react';
import { QuestionAnswerMap, QuestionPhotoMap } from '../components/door/installation/QuestionMaps';
import QuestionCodes from '../constants/QuestionCodes';
import StorageKeys from '../constants/StorageKeys';
import { ChecklistQuestion, InstallDoorInput } from '../queries';
import usePhotosStore, { Photo } from '../stores/QuestionPhotosStore';
import { GetDoorBeingActioned, GetAllDoorCheckLists } from '../services/DoorAsyncStorageHelperService';
import DoorStatus from '../constants/DoorStatus';

export interface DoorAction {
  doorId: string;
  location?: string;
  siteId: string;
  answers?: Answer[];
  status: DoorStatus;
}

interface AnswerPhoto {
  uri: string;
  filename: string;
  photoKey?: string;
}

interface Answer {
  questionId: string;
  questionCode: QuestionCodes;
  answer: any;
  photos?: AnswerPhoto[];
}

//the door status should be set to either InstallerInstalling or Inspecting
//these statuses are used to retrieve an existing checklist for a door that is either being installed or inspected
export default function useQuestion(
  doorId: string | undefined,
  questionList: Pick<ChecklistQuestion, 'id' | 'name' | 'code'>[] | undefined,
  doorStatus: DoorStatus
) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [initialised, setInitialised] = useState(false);
  const [completedQuestionCount, setCompletedQuestionCount] = useState<string>();
  const { photos, addPhotos, clearPhotos } = usePhotosStore();

  useEffect(() => {
    async function loadExistingAnswers() {
      try {
        clearPhotos();
        const doorCheckList = await GetDoorBeingActioned(doorStatus, doorId);
        if (doorCheckList) {
          if (doorCheckList.answers) {
            setAnswers(doorCheckList.answers);

            const existingPhotos = doorCheckList.answers.reduce((acc: Photo[], current) => {
              if (current.photos) {
                const photosForQuestion = current.photos.map(({ uri, filename, photoKey }) => ({
                  questionCode: current.questionCode,
                  uri,
                  filename,
                  photoKey,
                }));
                return [...acc, ...photosForQuestion];
              }
              return acc;
            }, []);

            addPhotos(existingPhotos);
          } else {
            initialiseQuestions();
          }
        } else {
          initialiseQuestions();
        }
      } catch (err) {
        console.log('Error loading existing answers', err);
      } finally {
        setInitialised(true);
      }
    }

    if (questionList && doorId) {
      loadExistingAnswers();
    }
  }, [doorId, questionList, addPhotos, clearPhotos]);

  useEffect(() => {
    async function savePhotos() {
      try {
        const doorCheckList = await GetDoorBeingActioned(doorStatus, doorId);

        if (doorCheckList && doorCheckList.answers) {
          const newAnswers = [...doorCheckList.answers];

          for (let i = 0; i < newAnswers.length; i++) {
            const photosForQuestion = photos.filter((p) => p.questionCode === newAnswers[i].questionCode);
            if (photosForQuestion.length > 0) {
              newAnswers[i].photos = photosForQuestion.map(({ uri, filename, photoKey }) => ({
                filename,
                uri,
                photoKey,
              }));
            } else {
              // if photos are disappearing across app reloads, this is probably the culprit.
              // i've added the if (answers.length > 0) below to try and prevent this from happening.
              newAnswers[i].photos = undefined;
            }
          }

          const allDoorChecks: DoorAction[] = await GetAllDoorCheckLists();
          const newDoorCheckList = allDoorChecks.map((d) => (d.doorId === doorId ? { ...d, answers: newAnswers } : d));
          await AsyncStorage.setItem(StorageKeys.CheckListsInProgress, JSON.stringify(newDoorCheckList));
        }
      } catch (err) {
        console.log('error saving answers', err);
      }
    }

    // i only want to run this AFTER answers initialised and then if photos change, not if the answers change
    if (initialised) {
      savePhotos();
    }
  }, [photos, doorId, initialised]);

  const getAnswer = (questionIndex: number) => answers[questionIndex]?.answer;

  const isPhotoRequired = useCallback(
    (questionIndex: number) => {
      try {
        const { questionCode, answer } = answers[questionIndex];
        return answers && QuestionPhotoMap[questionCode](answer);
      } catch {
        return false;
      }
    },
    [answers]
  );

  const isQuestionCompleted = useCallback(
    (questionIndex: number) => {
      try {
        const { questionCode, answer } = answers[questionIndex];
        const photosForQuestion = photos.filter((p) => p.questionCode === questionCode);
        const questionCompleted = answers && QuestionAnswerMap[questionCode](answer);
        const photoRequired = isPhotoRequired(questionIndex);

        // this could probably be written better but running out of time
        if (
          photoRequired &&
          (questionCode === QuestionCodes.GapsSlabFrameTolerance ||
            questionCode === QuestionCodes.GapsSlabFrameToleranceInsp ||
            questionCode === QuestionCodes.FrameFireStoppedInsp)
        ) {
          return questionCompleted && photosForQuestion.length === 3;
        }

        if (photoRequired && questionCode === QuestionCodes.DoorComplete) {
          return questionCompleted && photosForQuestion.length === 2;
        }

        if (photoRequired) {
          return questionCompleted && photosForQuestion.length > 0;
        }

        return questionCompleted;
      } catch {
        return false;
      }
    },
    [answers, isPhotoRequired, photos]
  );

  useEffect(() => {
    const completedCount = answers.filter((_, i) => isQuestionCompleted(i)).length;
    setCompletedQuestionCount(`${completedCount}/${answers.length}`);
  }, [answers, isQuestionCompleted]);

  const allQuestionsCompleted = () => answers.every((_, i) => isQuestionCompleted(i));

  const setAnswer = async (questionIndex: number, answer: any) => {
    const newAnswers = answers.map((existingAnswer, index) =>
      index === questionIndex ? { ...existingAnswer, answer } : existingAnswer
    );
    setAnswers(newAnswers);
    try {
      const doorCheckList = await GetDoorBeingActioned(doorStatus, doorId);

      if (doorCheckList) {
        const allDoorCheckLists: DoorAction[] = await GetAllDoorCheckLists();
        const newDoorCheckList = allDoorCheckLists.map((d) =>
          d.doorId === doorId ? { ...d, answers: newAnswers } : d
        );
        await AsyncStorage.setItem(StorageKeys.CheckListsInProgress, JSON.stringify(newDoorCheckList));
      }
    } catch (err) {
      console.log('error saving answers', err);
    }
  };

  const getCompletedChecklist = async (): Promise<InstallDoorInput | null> => {
    try {
      const allDoorCheckLists: DoorAction[] = await GetAllDoorCheckLists();
      const doorChecks: DoorAction | undefined = allDoorCheckLists.find((d) => d.doorId === doorId);
      if (doorChecks) {
        return {
          doorId: doorId!,
          siteId: doorChecks.siteId,
          location: doorChecks.location,
          answers: answers.map((a, i) => ({
            questionId: a.questionId,
            answer: JSON.stringify(a.answer),
            photos: isPhotoRequired(i)
              ? photos
                  .filter((p) => p.questionCode === a.questionCode)
                  .map((p) => {
                    return {
                      file: new ReactNativeFile({
                        uri: p.uri,
                        type: 'image/jpeg',
                        name: p.filename,
                      }),
                      photoKey: p.photoKey,
                    };
                  })
              : undefined,
          })),
        };
      }
      return null;
    } catch (err) {
      console.log('error get completed checklist:', err);
      return null;
    }
  };

  const removeChecklist = async () => {
    try {
      const allDoorCheckLists: DoorAction[] = await GetAllDoorCheckLists();
      const newDoorChecks = allDoorCheckLists.filter((c) => c.doorId !== doorId);
      await AsyncStorage.setItem(StorageKeys.CheckListsInProgress, JSON.stringify(newDoorChecks));
    } catch (err) {
      console.log('error trying to remove checklist:', err);
    }
  };

  const initialiseQuestions = async () => {
    const allDoorCheckLists: DoorAction[] = await GetAllDoorCheckLists();
    const initialiseAnswers: Answer[] = questionList!.map((q) => ({
      doorId: doorId!,
      questionId: q.id,
      questionCode: q.code as QuestionCodes,
      answer: null,
    }));

    setAnswers(initialiseAnswers);
    const newDoorChecks = allDoorCheckLists.map((d) =>
      d.doorId === doorId ? { ...d, answers: initialiseAnswers } : d
    );

    await AsyncStorage.setItem(StorageKeys.CheckListsInProgress, JSON.stringify(newDoorChecks));
    clearPhotos();
  };

  return {
    getAnswer,
    setAnswer,
    isQuestionCompleted,
    isPhotoRequired,
    allQuestionsCompleted,
    completedQuestionCount,
    getCompletedChecklist,
    removeChecklist,
  };
}
