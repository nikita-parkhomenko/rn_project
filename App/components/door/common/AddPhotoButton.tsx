import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

interface AddPhotoButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function AddPhotoButton({ onPress, style }: AddPhotoButtonProps) {
  return (
    <TouchableRipple style={[styles.button, style]} onPress={onPress}>
      <MaterialIcons name="add-a-photo" color="#787A88" size={34} />
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1, // you need borderRadius to get dashed style to work
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#787A88',
  },
});
