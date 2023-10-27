import React from 'react';
import { StyleSheet } from 'react-native';
import AutocompleteBase, { AutocompleteProps as BaseAutocompletProps } from 'react-native-autocomplete-input';
import { Text, TextInput, TouchableRipple } from 'react-native-paper';

interface AutocompleteProps<T> extends BaseAutocompletProps<T> {
  error: boolean;
  hideResults: boolean;
  setHideResults: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Autocomplete<T>({ hideResults, setHideResults, ...props }: AutocompleteProps<T>) {
  return (
    <AutocompleteBase
      {...props}
      inputContainerStyle={styles.inputContainer}
      // ignoring style prop here because it overrides the react native paper default styles
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderTextInput={({ style, ...other }) => (
        <TextInput
          {...other}
          mode="outlined"
          selectionColor={other.selectionColor as string | undefined}
          onBlur={() => setHideResults(true)}
          onFocus={() => setHideResults(false)}
        />
      )}
      listStyle={styles.listStyle}
      listContainerStyle={styles.listContainerStyle}
      hideResults={hideResults}
    />
  );
}

interface AutocompleteItemProps {
  text: string;
  onPress: () => void;
}

Autocomplete.Item = function AutocompleteItem({ text, onPress }: AutocompleteItemProps) {
  return (
    <TouchableRipple onPress={onPress} style={styles.listItemStyle}>
      <Text>{text}</Text>
    </TouchableRipple>
  );
};

// FYI - if you change these styles and they aren't updated on the screen, try opening InstallationStart.tsx and saving that file
// I don't know why but it fixes it for me
const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 0,
  },
  listContainerStyle: {
    backgroundColor: '#42445D',
    borderRadius: 4,
  },
  listStyle: {
    backgroundColor: '#42445D',
    borderWidth: 0,
  },
  listItemStyle: {
    padding: 15,
  },
});
