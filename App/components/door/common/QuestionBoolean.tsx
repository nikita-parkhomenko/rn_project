import React from 'react';
import { StyleSheet } from 'react-native';
import { Caption, useTheme } from 'react-native-paper';
import Toggle from '../../Toggle';

interface QuestionBooleanProps {
  onAnswered: (result: BooleanAnswer) => void;
  trueText?: string;
  falseText?: string;
  caption?: string;
  answer?: BooleanAnswer;
}

export interface BooleanAnswer {
  value: boolean;
}

export default function QuestionBoolean({
  onAnswered,
  caption,
  answer,
  trueText = 'Yes',
  falseText = 'No',
}: QuestionBooleanProps) {
  const { colors } = useTheme();
  return (
    <>
      {caption && <Caption style={styles.marginBottom}>{caption}</Caption>}
      <Toggle onSelected={(value: boolean) => onAnswered({ value })} defaultValue={answer?.value}>
        <Toggle.Button value={true}>{trueText}</Toggle.Button>
        <Toggle.Button value={false} selectedColour={colors.error} style={styles.marginTop}>
          {falseText}
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
