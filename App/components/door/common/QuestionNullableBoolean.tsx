import React from 'react';
import { StyleSheet } from 'react-native';
import { Caption, useTheme } from 'react-native-paper';
import Toggle from '../../Toggle';

type PossibleAnswers = 'Yes' | 'No' | 'N/A';

interface QuestionNullableBooleanProps {
  onAnswered: (result: NullableBooleanAnswer) => void;
  caption?: string;
  answer?: NullableBooleanAnswer;
  NAAnswerTextOverride?: string;
}

interface NullableBooleanAnswer {
  value?: PossibleAnswers;
}

export default function QuestionNullableBoolean({
  onAnswered,
  caption,
  answer,
  NAAnswerTextOverride,
}: QuestionNullableBooleanProps) {
  const { colors } = useTheme();

  return (
    <>
      {caption && <Caption style={styles.marginBottom}>{caption}</Caption>}
      <Toggle onSelected={(value: PossibleAnswers) => onAnswered({ value })} defaultValue={answer?.value}>
        <Toggle.Button value="Yes">Yes</Toggle.Button>
        <Toggle.Button value="No" selectedColour={colors.error} style={styles.marginTop}>
          No
        </Toggle.Button>
        <Toggle.Button value={NAAnswerTextOverride ?? 'N/A'} selectedColour="#42445D" style={styles.marginTop}>
          {NAAnswerTextOverride ?? 'N/A'}
        </Toggle.Button>
      </Toggle>
    </>
  );
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 15,
  },
  marginTop: {
    marginTop: 15,
  },
});
