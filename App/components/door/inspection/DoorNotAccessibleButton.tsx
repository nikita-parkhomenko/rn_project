import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet } from 'react-native';
import Routes from '../../../routing/Routes';
import Button from '../../Button';

interface DoorNotAccessibleButtonProps {
  doorId: string;
}

export default function DoorNotAccessibleButton({ doorId }: DoorNotAccessibleButtonProps) {
  const navigation = useNavigation();

  return (
    <Button
      mode="outlined"
      color="white"
      style={styles.button}
      onPress={() => navigation.navigate(Routes.DoorNotAccessible, { doorId })}
    >
      Door not accessible
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingBottom: 45,
  },
  button: {
    borderColor: 'red',
  },
});
