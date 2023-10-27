import { MaterialIcons } from '@expo/vector-icons';
import {
  BottomTabBarOptions,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import MainStackTabs from '../constants/MainStackTabs';
import Roles from '../constants/Roles';
import { tabBarHeight } from '../constants/Style';
import useAuth from '../hooks/useAuth';
import Identify from '../pages/Identify';
import DoorsStackScreen from './DoorsStackScreen';
import RepairStackScreen from './RepairStackScreen';
import InspectionsStackScreen from './InspectionsStackScreen';
import InstallationsStackScreen from './InstallationsStackScreen';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName: string, colour: string, focused: boolean) => {
  let iconName = '';

  switch (routeName) {
    case MainStackTabs.Doors:
      iconName = 'view-array';
      break;
    case MainStackTabs.Identify:
      iconName = 'nfc';
      break;
    case MainStackTabs.Installations:
      iconName = 'view-array';
      break;
    case MainStackTabs.Inspections:
      iconName = 'zoom-in';
      break;
    case MainStackTabs.Repairs:
      iconName = 'build';
  }

  return <MaterialIcons name={iconName} color={focused ? '#FFF' : colour} size={30} />;
};

const tabNavigationOptions = ({ route }: any): BottomTabNavigationOptions => ({
  tabBarIcon: ({ focused, color }: any) => getTabBarIcon(route.name, color, focused),
});

const tabBarOptions: BottomTabBarOptions = {
  activeTintColor: '#FFFFFF',
  style: {
    backgroundColor: '#11111A',
    height: tabBarHeight,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 0,
  },
};

export default function AppTabContainer() {
  const initialRoute = MainStackTabs.Doors;
  const { hasAnyRole } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={tabNavigationOptions}
      initialRouteName={initialRoute}
      tabBarOptions={tabBarOptions}
      lazy={false}
    >
      {hasAnyRole([Roles.Manufacturer, Roles.ManufacturerAdmin]) && (
        <Tab.Screen name={MainStackTabs.Doors} component={DoorsStackScreen} />
      )}
      {hasAnyRole([Roles.Installer, Roles.InstallerAdmin]) && (
        <Tab.Screen name={MainStackTabs.Installations} component={InstallationsStackScreen} />
      )}
      {hasAnyRole([Roles.Inspector, Roles.InspectorAdmin]) && (
        <Tab.Screen name={MainStackTabs.Inspections} component={InspectionsStackScreen} />
      )}
      {hasAnyRole([Roles.ServiceEngineer, Roles.ServiceEngineerAdmin]) && (
        <Tab.Screen name={MainStackTabs.Repairs} component={RepairStackScreen} />
      )}

      <Tab.Screen name={MainStackTabs.Identify} component={Identify} />
    </Tab.Navigator>
  );
}
