// outsource dependencies
import React from 'react';
import { Title } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

// local dependencies
import Routes from './Routes';
import Door from '../pages/Door';
import LogRepair from '../pages/LogRepair';
import RepairDoors from '../pages/RepairDoors';
import FinishRepair from '../pages/FinishRepair';
import DefaultHeaderOptions from './HeaderOptions';
import MyAccountIcon from '../components/MyAccountIcon';
import RetireDoorRecord from '../pages/RetireDoorRecord';

export type RepairStackParamList = {
  [Routes.RepairDoors]: undefined;
  [Routes.LogRepair]: { doorId: string };
  [Routes.RetireDoorRecord]: { doorId: string };
  [Routes.Door]: { doorId?: number; doorTagId?: string };
  [Routes.FinishRepair]: { photos: any[]; doorId: string };
};

const RepairStack = createStackNavigator<RepairStackParamList>();

export default function RepairStackScreen() {
  return (
    <RepairStack.Navigator
      initialRouteName={Routes.RepairDoors}
      screenOptions={{
        ...DefaultHeaderOptions,
        headerTitle: (props: { children: React.ReactNode }) => <Title>{props.children}</Title>,
        headerRight: () => <MyAccountIcon />,
      }}
    >
      <RepairStack.Screen name={Routes.RepairDoors} component={RepairDoors} />
      <RepairStack.Screen name={Routes.Door} component={Door} />
      <RepairStack.Screen name={Routes.LogRepair} component={LogRepair} />
      <RepairStack.Screen name={Routes.FinishRepair} component={FinishRepair} />
      <RepairStack.Screen name={Routes.RetireDoorRecord} component={RetireDoorRecord} />
    </RepairStack.Navigator>
  );
}
