import AsyncStorage from '@react-native-community/async-storage';
import * as React from 'react';
import { useEffect } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import StorageKeys from '../constants/StorageKeys';
import useAuth from '../hooks/useAuth';
import { useLoggedInQuery } from '../queries';

/// This component will render only when we are unsure of the login status of the user. It will then query the server to determine if it is the case.
/// Additional consideration has to be taken when dealing with network connection errors
export default function Splash() {
  const image = require('../assets/Login_background.jpg');
  const { data, error } = useLoggedInQuery();
  const { setLoggedInUser } = useAuth();

  useEffect(() => {
    async function setLoggedInDetails() {
      if (error) {
        //if the user is not logged in, the log in pafge will follow the splash screen
        setLoggedInUser(undefined);
      } else if (data) {
        //if the user is not logged in, the user will be taken to their previous page (get the previously stored token - it's ok if this has expired - the server will sort it out)
        await AsyncStorage.getItem(StorageKeys.Token)
          .then((token) => {
            setLoggedInUser({
              id: data.loggedIn.id,
              fullName: data.loggedIn.fullName,
              companyId: data.loggedIn.company?.id,
              companyName: data.loggedIn.company?.name,
              roles: data.loggedIn.roles,
              jwtHeader: token === undefined ? '' : (token as string),
              email: data.loggedIn.email,
            });
          })
          .catch(() => {
            console.log('Error fetching AsyncStorage in Splash Screen');
          });
      }
    }

    setLoggedInDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]); // don't add setLoggedInUser here otherwise infinite loop

  return (
    <Background>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Logo />
          </View>
          <View style={styles.main}>
            <ActivityIndicator animating={true} />
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
    justifyContent: 'center',
  },
});
