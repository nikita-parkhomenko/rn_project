import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { backgroundColor } from '../../../constants/Style';
import DoorStatus from '../../../constants/DoorStatus';
import useQuestion from '../../../hooks/useQuestion';
import useSnackbar from '../../../hooks/useSnackbar';
import { useChecklistQuestionsQuery, useInstallDoorMutation } from '../../../queries';
import Button from '../../Button';
import Spinner from '../../Spinner';
import Question from '../common/Question';
import QuestionContent from './QuestionContentInstallation';

interface DoorChecklistInstallationProps {
  doorId?: string;
  onQuestionAnswered: (completedQuestionCount?: string) => void;
  onInstallationComplete: () => void;
}

export default function DoorChecklistInstallation({
  doorId,
  onQuestionAnswered,
  onInstallationComplete,
}: DoorChecklistInstallationProps) {
  const { data, error, loading } = useChecklistQuestionsQuery({
    variables: {
      code: 'Installation',
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
  } = useQuestion(doorId, data?.checklistQuestions, DoorStatus.InstallerInstalling);
  const [installDoor, { loading: isCompleting }] = useInstallDoorMutation();
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
        await installDoor({
          variables: {
            checklist: completedChecklist,
          },
        });
        await removeChecklist();
        showSnackbar('Installation completed');
        onInstallationComplete();
      }
    } catch (err) {
      console.log('error installing door', err);
      showSnackbar('There was an error completing the installation, please try again later');
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
