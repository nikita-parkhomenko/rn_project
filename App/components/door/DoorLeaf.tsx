import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Title, Caption } from 'react-native-paper';

interface DoorLeafProps {
  leafNumber: number;
  acousticRating?: string | null;
  coreSupplier?: string | null;
  width?: string | null;
  height?: string | null;
}

export default function DoorLeaf({ acousticRating, coreSupplier, width, height, leafNumber }: DoorLeafProps) {
  return (
    <Surface style={styles.surface}>
      <Title style={styles.leafTitle}>Door leaf {leafNumber}</Title>
      <View style={styles.row}>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>Acoustic rating</Title>
          <Caption style={styles.text}>{acousticRating ? `${acousticRating}dB` : '-'}</Caption>
        </View>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>Core supplier</Title>
          <Caption style={styles.text}>{coreSupplier ?? '-'}</Caption>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>Leaf width</Title>
          <Caption style={styles.text}>{width ? `${width}mm` : '-'}</Caption>
        </View>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>Leaf height</Title>
          <Caption style={styles.text}>{height ? `${height}mm` : '-'}</Caption>
        </View>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    marginTop: 15,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  detail: {
    flex: 1,
  },
  leafTitle: {
    marginBottom: 25,
  },
  text: {
    fontSize: 16,
  },
  title: {
    fontWeight: '700',
  },
});
