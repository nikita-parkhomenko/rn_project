import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Toggle from '../../Toggle';

type PossibleAnswers = 'Internal' | 'External' | 'N/A';

interface QuestionDoorCloserInternalExternalProps {
  onAnswered: (result: QuestionDoorCloserInternalExternalAnswer) => void;
  answer?: QuestionDoorCloserInternalExternalAnswer;
}

interface QuestionDoorCloserInternalExternalAnswer {
  value?: PossibleAnswers;
}

export default function QuestionDoorCloserInternalExternal({
  onAnswered,
  answer,
}: QuestionDoorCloserInternalExternalProps) {
  const { colors } = useTheme();

  return (
    <Toggle onSelected={(value: PossibleAnswers) => onAnswered({ value })} defaultValue={answer?.value}>
      <Toggle.Button value="Internal">Internal</Toggle.Button>
      <Toggle.Button value="External" selectedColour={colors.error} style={styles.marginTop}>
        External
      </Toggle.Button>
      <Toggle.Button value="N/A" selectedColour="#42445D" style={styles.marginTop}>
        N/A
      </Toggle.Button>
    </Toggle>
  );
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 15,
  },
});
