import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { backgroundColor } from '../../constants/Style';
import Button from '../Button';

export default function DoorNotFound() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>No matching door record found</Text>
      <Button style={styles.button} onPress={() => navigation.goBack()}>
        OK
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    minWidth: 70,
  },
});
