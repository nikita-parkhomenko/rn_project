import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Title } from 'react-native-paper';
import MyAccountIcon from '../components/MyAccountIcon';
import Door from '../pages/Door';
import InstallerDoors from '../pages/InstallerDoors';
import SignOffInstallation from '../pages/SignOffInstallation';
import DefaultHeaderOptions from './HeaderOptions';
import Routes from './Routes';
import SignOffInstallationComment from '../pages/SignOffInstallationComment';

export type InstallationStackParamList = {
  [Routes.Door]: { doorId?: number; doorTagId?: string };
  [Routes.InstallerDoors]: undefined;
  [Routes.SignOffInstallation]: { doorId: number };
  [Routes.SignOffInstallationComment]: { doorId: number; isSuccess: boolean };
};

const InstallationStack = createStackNavigator<InstallationStackParamList>();

export default function InstallationsStackScreen() {
  return (
    <InstallationStack.Navigator
      screenOptions={{
        ...DefaultHeaderOptions,
        headerTitle: (props) => <Title>{props.children}</Title>,
        headerRight: () => <MyAccountIcon />,
      }}
    >
      <InstallationStack.Screen name={Routes.InstallerDoors} component={InstallerDoors} />
      <InstallationStack.Screen name={Routes.Door} component={Door} />
      <InstallationStack.Screen name={Routes.SignOffInstallation} component={SignOffInstallation} />
      <InstallationStack.Screen name={Routes.SignOffInstallationComment} component={SignOffInstallationComment} />
    </InstallationStack.Navigator>
  );
}
