import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { backgroundColor } from '../constants/Style';

interface BackgroundProps {
  children?: React.ReactNode;
}

export default function Background({ children }: BackgroundProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundColor,
  },
});
