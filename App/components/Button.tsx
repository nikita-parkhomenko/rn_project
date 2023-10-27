import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PButton } from 'react-native-paper';

export default function Button({ children, mode = 'contained', ...other }: React.ComponentProps<typeof PButton>) {
  return (
    <PButton {...other} style={[styles.button, other.style]} mode={mode}>
      {children}
    </PButton>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
  },
});
