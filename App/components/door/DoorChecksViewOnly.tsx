import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { backgroundColor } from '../../constants/Style';
import { useChecklistAnswersByInstallationIdQuery, useInstallationsByDoorIdQuery } from '../../queries';
import Spinner from '../Spinner';
import Question from './common/Question';
import QuestionContentViewOnly from './installation/QuestionContentViewOnly';

interface DoorChecksProps {
  doorId: string;
}

export default function DoorChecksViewOnly({ doorId }: DoorChecksProps) {
  const { data: installationData } = useInstallationsByDoorIdQuery({
    variables: {
      doorId: doorId,
    },
  });

  const installationId = installationData?.installationsByDoorId.filter(
    (x) => x.isSignedOff === undefined || x.isSignedOff === null
  )[0]?.id;

  const { data, loading, error } = useChecklistAnswersByInstallationIdQuery({
    variables: {
      installationId: parseInt(installationId!),
    },
  });

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>There was an error fetching the checks</Text>
      </View>
    );
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <ScrollView style={styles.container}>
      {data?.checklistAnswersByInstallationId.map((d, i) => (
        <Question key={i} completed={true} question={d.checklistQuestion.name} autoExpand={true}>
          <QuestionContentViewOnly
            questionCode={d.checklistQuestion.code}
            answer={d.answer}
            photos={d.documents === null ? undefined : d.documents}
          />
        </Question>
      ))}
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
