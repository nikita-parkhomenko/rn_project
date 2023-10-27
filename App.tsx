import { ApolloProvider } from '@apollo/react-hooks';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { backgroundColor, primaryColour } from './App/constants/Style';
import { AuthContextProvider } from './App/context/auth/AuthContext';
import SnackbarProvider from './App/providers/SnackbarProvider';
import RootStackScreen from './App/routing/RootStackScreen';
import client from './client';
import NfcProvider from './App/providers/NfcProvider';
import { useFonts } from '@use-expo/font';

const theme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColour,
    background: backgroundColor,
    surface: '#222333',
    placeholder: 'rgba(255,255,255,0.6)',
    text: '#fff',
    error: '#FF6860',
  },
};

export default function App() {
  useFonts({
    'Caveat-Regular': require('./App/assets/fonts/Caveat-Regular.ttf'),
  });

  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <PaperProvider theme={theme}>
          <NfcProvider>
            <SnackbarProvider>
              <NavigationContainer>
                <RootStackScreen />
              </NavigationContainer>
            </SnackbarProvider>
          </NfcProvider>
        </PaperProvider>
      </AuthContextProvider>
    </ApolloProvider>
  );
}
