import React, { useState, useCallback } from 'react';
import { Snackbar, Text } from 'react-native-paper';
import SnackbarContext from '../context/SnackbarContext';
import { StyleSheet } from 'react-native';
import { tabBarHeight } from '../constants/Style';

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export default function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [visible, setIsVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState<string>();

  const showSnackbar = useCallback((message: string) => {
    setIsVisible(true);
    setSnackMessage(message);
  }, []);
  const action = {
    label: 'close',
    onPress: () => setIsVisible(false),
  };

  const contextValue = { showSnackbar };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        action={action}
        duration={6000}
        visible={visible}
        style={styles.snackbar}
        onDismiss={() => setIsVisible(false)}
      >
        <Text>{snackMessage}</Text>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: '#35364A',
    marginBottom: tabBarHeight + 30,
  },
});
