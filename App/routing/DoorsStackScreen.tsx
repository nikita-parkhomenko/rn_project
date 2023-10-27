import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Title } from 'react-native-paper';
import MyAccountIcon from '../components/MyAccountIcon';
import Door from '../pages/Door';
import ManufacturedDoors from '../pages/ManufacturedDoors';
import DefaultHeaderOptions from './HeaderOptions';
import Routes from './Routes';

export type DoorsStackParamList = {
  [Routes.ManufacturedDoors]: undefined;
  [Routes.Door]: { doorId?: number; doorTagId?: string; doorScanned?: boolean };
};

const DoorsStack = createStackNavigator<DoorsStackParamList>();

export default function MainStackScreen() {
  return (
    <DoorsStack.Navigator
      screenOptions={{
        ...DefaultHeaderOptions,
        headerTitle: (props) => <Title>{props.children}</Title>,
        headerRight: () => <MyAccountIcon />,
      }}
    >
      <DoorsStack.Screen name={Routes.ManufacturedDoors} component={ManufacturedDoors} />
      <DoorsStack.Screen name={Routes.Door} component={Door} />
    </DoorsStack.Navigator>
  );
}
