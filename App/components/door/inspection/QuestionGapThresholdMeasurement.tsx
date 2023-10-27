import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import QuestionBoolean, { BooleanAnswer } from '../common/QuestionBoolean';

interface GapThresholdWithMeasurementProps {
  onAnswered: (result: GapThresholdWithMeasurementAnswer) => void;
  answer?: GapThresholdWithMeasurementAnswer;
}

interface GapThresholdWithMeasurementAnswer {
  value?: boolean;
  gapMeasurement?: number;
}

export default function GapThresholdWithMeasurement({ onAnswered, answer }: GapThresholdWithMeasurementProps) {
  const [gapMeasurement, setGapMeasurement] = useState<string>(answer?.gapMeasurement?.toString() ?? '');
  const [selectedOption, setSelectedOption] = useState<boolean | undefined>(answer?.value);

  const onOptionSelected = (option: BooleanAnswer) => {
    setSelectedOption(option.value);
    onAnswered({
      value: option.value,
      gapMeasurement: gapMeasurement ? Number(gapMeasurement) : undefined,
    });
  };

  const onChangeText = (text: string) => {
    setGapMeasurement(text);
    onAnswered({
      value: selectedOption,
      gapMeasurement: text ? Number(text) : undefined,
    });
  };

  return (
    <>
      <QuestionBoolean onAnswered={onOptionSelected} answer={answer as any} />
      <TextInput
        label="Recorded max gap"
        mode="outlined"
        value={gapMeasurement}
        onChangeText={onChangeText}
        keyboardType="number-pad"
        style={styles.textInput}
        scrollEnabled
      />
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#222333',
    maxWidth: 200,
    marginTop: 15,
  },
});
