import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Title } from 'react-native-paper';
import MyAccountIcon from '../components/MyAccountIcon';
import Door from '../pages/Door';
import DoorNotAccessible from '../pages/DoorNotAccessible';
import InspectorDoors from '../pages/InspectorDoors';
import SignOffInspection from '../pages/SignOffInspection';
import SignOffInspectionComment from '../pages/SignOffInspectionComment';
import DefaultHeaderOptions from './HeaderOptions';
import Routes from './Routes';

export type InspectionStackParamList = {
  [Routes.Door]: { doorId?: number; doorTagId?: string };
  [Routes.InspectorDoors]: undefined;
  [Routes.SignOffInspection]: { doorId: number };
  [Routes.SignOffInspectionComment]: { doorId: number; isSuccess: boolean };
  [Routes.DoorNotAccessible]: { doorId: string };
};

const InspectionStack = createStackNavigator<InspectionStackParamList>();

export default function InspectionsStackScreen() {
  return (
    <InspectionStack.Navigator
      screenOptions={{
        ...DefaultHeaderOptions,
        headerTitle: (props) => <Title>{props.children}</Title>,
        headerRight: () => <MyAccountIcon />,
      }}
    >
      <InspectionStack.Screen name={Routes.InspectorDoors} component={InspectorDoors} />
      <InspectionStack.Screen name={Routes.Door} component={Door} />
      <InspectionStack.Screen name={Routes.SignOffInspection} component={SignOffInspection} />
      <InspectionStack.Screen name={Routes.SignOffInspectionComment} component={SignOffInspectionComment} />
      <InspectionStack.Screen name={Routes.DoorNotAccessible} component={DoorNotAccessible} />
    </InspectionStack.Navigator>
  );
}
