// outsource dependencies
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Caption } from 'react-native-paper';

interface DoorRowProps {
  title: string;
  caption?: string | null;
}

export default function DoorRow({ title, caption }: DoorRowProps) {
  return (
    <View style={styles.detail}>
      <Title style={[styles.text, styles.title]}>{title}</Title>
      <Caption style={styles.text}>{caption || '-'}</Caption>
    </View>
  );
}

const styles = StyleSheet.create({
  detail: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  title: {
    fontWeight: '700',
  },
});
