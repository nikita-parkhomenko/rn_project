import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { useFireStoppingTypesQuery } from '../../../queries';

interface QuestionFireStoppingProps {
  onAnswered: (result: QuestionFireStoppingAnswer) => void;
  answer?: QuestionFireStoppingAnswer;
  showUnableToConfirm?: boolean;
}

interface QuestionFireStoppingAnswer {
  value: number;
}

export default function QuestionFireStopping({ onAnswered, answer, showUnableToConfirm }: QuestionFireStoppingProps) {
  const [options, setOptions] = useState<Item[]>([]);
  const { data } = useFireStoppingTypesQuery();

  useEffect(() => {
    if (data && data.fireStoppingTypes) {
      if (showUnableToConfirm) {
        //don't filter out the 'Unable to Confirm' option
        setOptions(data.fireStoppingTypes.map((x) => ({ value: x.id.toString(), label: x.name })));
      } else {
        //filter out the 'Unable to Confirm' option
        setOptions(
          data.fireStoppingTypes
            .filter((x) => {
              return x.name !== 'Unable to Confirm';
            })
            .map((x) => ({ value: x.id.toString(), label: x.name }))
        );
      }
    }
  }, [data]);

  return (
    <RNPickerSelect
      items={options}
      style={pickerSelectStyles}
      onValueChange={(value: number) => onAnswered({ value })}
      value={answer?.value}
      useNativeAndroidPickerStyle={false}
    />
  );
}

const styles = StyleSheet.create({
  dropdownStyle: {
    color: '#a5a6b8',
    height: 50,
    borderWidth: 1,
    borderColor: '#a5a6b8',
    borderRadius: 5,
    paddingLeft: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    ...styles.dropdownStyle,
  },
  inputIOS: {
    ...styles.dropdownStyle,
  },
});
