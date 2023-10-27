import React from 'react';
import Routes from '../routing/Routes';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { headerColour } from '../constants/Style';
import { useNavigation } from '@react-navigation/native';

export default function MyAccountIcon() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <IconButton
        color="#D9DFE6"
        icon="account"
        onPress={() => {
          navigation.navigate(Routes.MyAccount);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: headerColour,
    paddingHorizontal: 12,
  },
});
