import React from 'react';
import { StyleSheet } from 'react-native';
import { List, useTheme } from 'react-native-paper';

interface QuestionProps {
  children: React.ReactNode;
  completed: boolean;
  question: string;
  autoExpand?: boolean;
}

export default function Question({ children, completed, question, autoExpand }: QuestionProps) {
  const { colors } = useTheme();
  return (
    <List.Accordion
      style={styles.container}
      titleStyle={styles.titleStyle}
      title={question}
      titleNumberOfLines={5}
      {...(autoExpand ? { expanded: true } : {})}
      left={() => (
        <List.Icon
          color={completed ? colors.primary : '#787A88'}
          icon={completed ? 'check-circle' : 'circle-outline'}
        />
      )}
    >
      {children}
    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222333',
    marginBottom: 10,
  },
  titleStyle: {
    color: '#fff',
  },
});
