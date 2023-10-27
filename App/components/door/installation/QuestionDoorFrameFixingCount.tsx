import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import QuestionBoolean, { BooleanAnswer } from '../common/QuestionBoolean';

interface QuestionDoorFrameFixingCountProps {
  onAnswered: (result: QuestionDoorFrameFixingCountAnswer) => void;
  answer?: QuestionDoorFrameFixingCountAnswer;
}

interface QuestionDoorFrameFixingCountAnswer {
  value?: boolean;
  fixingsPerJamb?: number;
}

export default function QuestionDoorFrameFixingCount({ onAnswered, answer }: QuestionDoorFrameFixingCountProps) {
  const [fixingsPerJamb, setFixingsPerJamb] = useState<string>(answer?.fixingsPerJamb?.toString() ?? '');
  const [selectedOption, setSelectedOption] = useState<boolean | undefined>(answer?.value);

  const onOptionSelected = (option: BooleanAnswer) => {
    setSelectedOption(option.value);
    onAnswered({
      value: option.value,
      fixingsPerJamb: fixingsPerJamb ? Number(fixingsPerJamb) : undefined,
    });
  };

  const onChangeText = (text: string) => {
    setFixingsPerJamb(text);
    onAnswered({
      value: selectedOption,
      fixingsPerJamb: text ? Number(text) : undefined,
    });
  };

  return (
    <>
      <QuestionBoolean onAnswered={onOptionSelected} answer={answer as any} />
      <TextInput
        label="Fixings per jamb"
        mode="outlined"
        value={fixingsPerJamb}
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
