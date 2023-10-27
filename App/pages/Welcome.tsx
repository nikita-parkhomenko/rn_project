import * as React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routing/RootStackScreen';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { version, build } from '../services/EnvironmentService';
import Routes from '../routing/Routes';

export type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, Routes.Welcome>;

interface WelcomeProps {
  navigation: WelcomeScreenNavigationProp;
}

export default function Welcome({ navigation }: WelcomeProps) {
  const image = require('../assets/Login_background.jpg');
  return (
    <Background>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Logo />
          </View>
          <View style={styles.main}>
            <Button mode="contained" onPress={() => navigation.navigate(Routes.Login)}>
              Log in
            </Button>
            <View style={styles.versionContainer}>
              <Text style={styles.version}>
                Version: {version} Build: {build}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  version: {
    color: '#FFF',
    opacity: 0.4,
    fontSize: 10,
  },
  logo: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  main: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
