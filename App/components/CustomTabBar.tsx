import React from 'react';
import { StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { TabBar } from 'react-native-tab-view';
import { primaryColour, headerColour } from '../constants/Style';

const CustomTabBarLabel = ({ route, focused }: any) => (
  <Paragraph style={{ opacity: focused ? 1 : 0.4 }}>{route.title}</Paragraph>
);

export default function CustomTabBar(props: any) {
  // when more tabs are added, set scrollEnabled to true and tabStyle={{ width: 'auto' }}
  return <TabBar {...props} indicatorStyle={styles.indicator} style={styles.tabBar} renderLabel={CustomTabBarLabel} />;
}

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: primaryColour,
  },
  tabBar: {
    backgroundColor: headerColour,
  },
});
