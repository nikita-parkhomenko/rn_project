import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import DoorStatus from '../../../constants/DoorStatus';
import { backgroundColor } from '../../../constants/Style';
import useQuestion from '../../../hooks/useQuestion';
import useSnackbar from '../../../hooks/useSnackbar';
import { useChecklistQuestionsQuery, useInspectDoorMutation } from '../../../queries';
import Button from '../../Button';
import Spinner from '../../Spinner';
import Question from '../common/Question';
import QuestionContent from './QuestionContentInspection';

interface DoorChecklistInspectionProps {
  doorId?: string;
  onQuestionAnswered: (completedQuestionCount?: string) => void;
  onInspectionComplete: () => void;
}

export default function DoorChecklistInspection({
  doorId,
  onQuestionAnswered,
  onInspectionComplete,
}: DoorChecklistInspectionProps) {
  const { data, error, loading } = useChecklistQuestionsQuery({
    variables: {
      code: 'Inspection',
    },
  });
  const {
    setAnswer,
    getAnswer,
    isQuestionCompleted,
    allQuestionsCompleted,
    completedQuestionCount,
    getCompletedChecklist,
    isPhotoRequired,
    removeChecklist,
  } = useQuestion(doorId, data?.checklistQuestions, DoorStatus.Inspecting);
  const [inspectDoor, { loading: isCompleting }] = useInspectDoorMutation();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    onQuestionAnswered(completedQuestionCount);
  }, [completedQuestionCount, onQuestionAnswered]);

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>There was an error fetching questions</Text>
      </View>
    );
  }

  if (loading) {
    return <Spinner />;
  }

  const finish = async () => {
    try {
      const completedChecklist = await getCompletedChecklist();
      if (completedChecklist) {
        await inspectDoor({
          variables: {
            checklist: completedChecklist,
          },
        });
        await removeChecklist();
        showSnackbar('Inspection completed');
        onInspectionComplete();
      }
    } catch (err) {
      console.log('error installing door', err);
      showSnackbar('There was an error completing the inspection, please try again later');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {data?.checklistQuestions.map((q, i) => (
        <Question key={i} completed={isQuestionCompleted(i)} question={q.name}>
          <QuestionContent
            onAnswered={(result) => setAnswer(i, result)}
            questionCode={q.code}
            answer={getAnswer(i)}
            photoRequired={isPhotoRequired(i)}
          />
        </Question>
      ))}
      <Button
        style={styles.finishButton}
        disabled={!allQuestionsCompleted() || isCompleting}
        loading={isCompleting}
        onPress={finish}
      >
        Finish
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  finishButton: {
    margin: 20,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
