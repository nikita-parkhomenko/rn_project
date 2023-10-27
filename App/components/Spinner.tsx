import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { backgroundColor } from '../constants/Style';

export default function Spinner() {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
  },
});
