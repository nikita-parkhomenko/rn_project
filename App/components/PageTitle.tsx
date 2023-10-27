import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { headerColour } from '../constants/Style';

interface PageTitleProps {
  title: string;
  right?: React.ReactNode;
}

export default function PageTitle({ title, right }: PageTitleProps) {
  return (
    <View style={styles.container}>
      <Title>{title}</Title>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: headerColour,
    paddingLeft: 20,
    paddingRight: 13,
    paddingBottom: 20,
  },
});
