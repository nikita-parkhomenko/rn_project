import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { headerColour } from '../constants/Style';
import useAuth from '../hooks/useAuth';
import Login from '../pages/Login';
import Splash from '../pages/Splash';
import Welcome from '../pages/Welcome';
import AppTabContainer from './AppTabContainer';
import Routes from './Routes';
import Company from '../pages/Company';
import MyAccount from '../pages/MyAccount';
import DefaultHeaderOptions from './HeaderOptions';

export type RootStackParamList = {
  [Routes.Welcome]: undefined;
  [Routes.Company]: undefined;
  [Routes.Login]: undefined;
  [Routes.Main]: undefined;
  [Routes.Splash]: undefined;
  [Routes.MyAccount]: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();
export default function RootStackScreen() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'default' : 'light-content'}
        translucent={true}
        backgroundColor={headerColour}
      />
      <RootStack.Navigator mode="modal" screenOptions={DefaultHeaderOptions}>
        {isLoggedIn === undefined && (
          <RootStack.Screen name={Routes.Splash} component={Splash} options={{ headerShown: false }} />
        )}
        {isLoggedIn === false && (
          <>
            <RootStack.Screen name={Routes.Welcome} component={Welcome} options={{ headerShown: false }} />
            <RootStack.Screen
              name={Routes.Login}
              component={Login}
              options={{
                headerShown: true,
              }}
            />
          </>
        )}
        {isLoggedIn && (
          <>
            <RootStack.Screen name={Routes.Main} component={AppTabContainer} options={{ headerShown: false }} />
            <RootStack.Screen name={Routes.MyAccount} component={MyAccount} />
            <RootStack.Screen name={Routes.Company} component={Company} />
          </>
        )}
      </RootStack.Navigator>
    </>
  );
}
