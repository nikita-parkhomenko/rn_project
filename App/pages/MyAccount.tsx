import AsyncStorage from '@react-native-community/async-storage';
import * as React from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import Routes from '../routing/Routes';
import { Divider, List } from 'react-native-paper';
import BackgroundGlitchFix from '../components/BackgroundGlitchFix';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import StorageKeys from '../constants/StorageKeys';
import { backgroundColor, secondaryColour } from '../constants/Style';
import useAuth from '../hooks/useAuth';
import { useCancelInspectionsMutation, useCancelInstallationsMutation } from '../queries';
import { privacyPolicyUrl, termsAndConditionsUrl } from '../services/EnvironmentService';
import {
  GetAllDoorInspectionCheckLists,
  GetAllDoorInstallerCheckLists,
} from '../services/DoorAsyncStorageHelperService';
import Roles from '../constants/Roles';

export default function MyAccount({ navigation }: any) {
  const { logout, loggedInUser, hasAnyRole } = useAuth();

  const [cancelInstallationsMutation] = useCancelInstallationsMutation();
  const [cancelInspectionsMutation] = useCancelInspectionsMutation();

  const onLogout = async () => {
    try {
      const installationChecksInProgress = await GetAllDoorInstallerCheckLists();

      if (installationChecksInProgress) {
        const doorIds = installationChecksInProgress.map((ec: any) => Number(ec.doorId));
        await cancelInstallationsMutation({
          variables: {
            idListInput: { ids: doorIds },
          },
        });
      }

      const inspectionChecksInProgress = await GetAllDoorInspectionCheckLists();

      if (inspectionChecksInProgress) {
        const doorIds = inspectionChecksInProgress.map((ec: any) => Number(ec.doorId));
        await cancelInspectionsMutation({
          variables: {
            idListInput: { ids: doorIds },
          },
        });
      }

      //remove all installation and inspection checklists
      await AsyncStorage.removeItem(StorageKeys.CheckListsInProgress);
    } catch {
      // there was an error, but as we are logging out we should just carry on.
    }

    logout();
  };
  return (
    <View style={styles.container}>
      <BackgroundGlitchFix />
      <PageTitle title="My account" />
      <ScrollView style={styles.body} contentContainerStyle={styles.listContent}>
        <List.Section>
          <List.Item
            titleStyle={styles.listItemText}
            title={loggedInUser?.fullName}
            left={() => <List.Icon icon="account" />}
          />
          <Divider />
          <List.Item
            titleStyle={styles.listItemText}
            title={loggedInUser?.email}
            left={() => <List.Icon icon="email" />}
          />
          <Divider />
          {hasAnyRole([Roles.Inspector, Roles.InspectorAdmin, Roles.ServiceEngineer, Roles.ServiceEngineerAdmin]) && (
            <>
              <List.Item
                titleStyle={styles.listItemText}
                title={loggedInUser?.companyName}
                left={() => <List.Icon icon="office-building" />}
                onPress={() => navigation.navigate(Routes.Company)}
              />
              <Divider />
            </>
          )}
          <List.Item
            titleStyle={styles.listItemText}
            title="Privacy policy"
            onPress={() => Linking.openURL(privacyPolicyUrl)}
            left={() => <List.Icon icon="shield-account" />}
          />
          <Divider />
          <List.Item
            titleStyle={styles.listItemText}
            title="Terms and conditions"
            onPress={() => Linking.openURL(termsAndConditionsUrl)}
            left={() => <List.Icon icon="information" />}
          />
          <Divider />
          {__DEV__ && (
            <>
              <List.Item
                titleStyle={styles.listItemText}
                title="Clear storage"
                onPress={() => AsyncStorage.clear()}
                left={() => <List.Icon icon="delete-empty" />}
              />
              <Divider />
            </>
          )}
        </List.Section>
        <Button onPress={onLogout} color={secondaryColour} style={styles.signout}>
          Sign out
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  body: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  signout: {
    marginTop: 'auto',
  },
  listItemText: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
});
