import AsyncStorage from '@react-native-community/async-storage';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import StorageKeys from '../../../constants/StorageKeys';
import useScan from '../../../hooks/useScan';
import useSnackbar from '../../../hooks/useSnackbar';
import {
  DoorFragment,
  SitesByNameQuery,
  useSitesByNameLazyQuery,
  useStartInstallationMutation,
} from '../../../queries';
import { DoorsStackParamList } from '../../../routing/DoorsStackScreen';
import Routes from '../../../routing/Routes';
import Autocomplete from '../../Autocomplete';
import Button from '../../Button';
import DoorStatus from '../../../constants/DoorStatus';

function getAutocompleteOptions(data: SitesByNameQuery | undefined, query: string) {
  if (data) {
    if (data.sitesByName.length === 1 && data.sitesByName[0].name === query) {
      return [];
    } else {
      return data.sitesByName;
    }
  }

  return [];
}

interface InstallationStartProps {
  door: DoorFragment;
  onInstallationStart: () => void;
}

export default function InstallationStart({ door, onInstallationStart }: InstallationStartProps) {
  const [location, setLocation] = useState(door.location ?? '');
  const [query, setQuery] = useState(door.site?.name ?? '');
  const [debouncedQuery] = useDebounce(query, 500);
  const [getSites, { data, error }] = useSitesByNameLazyQuery();
  const [submitted, setSubmitted] = useState(false);
  const [hideResults, setHideResults] = useState(false);
  const { colors } = useTheme();
  const { showSnackbar } = useSnackbar();
  const [startInstallationMutation] = useStartInstallationMutation();
  const { scanNfc, stopScan } = useScan();
  const route = useRoute<RouteProp<DoorsStackParamList, Routes.Door>>();
  const { doorScanned } = route.params;

  useEffect(() => {
    if (door.site) {
      setQuery(door.site.name);
      setHideResults(true);
    }
  }, [door]);

  useEffect(() => {
    if (debouncedQuery) {
      getSites({
        variables: {
          name: debouncedQuery,
        },
      });
    }
  }, [getSites, debouncedQuery]);

  useEffect(() => {
    if (error) {
      showSnackbar('There was an error fetching sites');
    }
  }, [error, showSnackbar]);

  const autocompleteOptions = getAutocompleteOptions(data, query);
  const isValidSite = query && data?.sitesByName.some((s) => s.name === query);

  const doStartInstallation = async () => {
    Keyboard.dismiss();
    setSubmitted(true);
    if (isValidSite) {
      const doorId = door.id;
      const site = data!.sitesByName.find((s) => s.name === query);
      try {
        await startInstallationMutation({
          variables: {
            doorId,
            location,
            siteId: site!.id,
          },
        });

        const checksInProgress = await AsyncStorage.getItem(StorageKeys.CheckListsInProgress);
        if (checksInProgress) {
          try {
            const existingChecks = JSON.parse(checksInProgress);
            existingChecks.push({
              doorId,
              location,
              siteId: site?.id,
              status: DoorStatus.InstallerInstalling,
            });
            await AsyncStorage.setItem(StorageKeys.CheckListsInProgress, JSON.stringify(existingChecks));
          } catch {
            const values = [{ doorId, location, siteId: site?.id, status: DoorStatus.InstallerInstalling }];
            await AsyncStorage.setItem(StorageKeys.CheckListsInProgress, JSON.stringify(values));
          }
        } else {
          const values = [{ doorId, location, siteId: site?.id, status: DoorStatus.InstallerInstalling }];
          await AsyncStorage.setItem(StorageKeys.CheckListsInProgress, JSON.stringify(values));
        }

        onInstallationStart();
      } catch (e) {
        console.log(e);
        showSnackbar('There was an error starting the installation: ' + e?.message);
      }
    }
  };

  const startInstallation = async () => {
    if (!doorScanned && !__DEV__) {
      scanNfc({
        onScan: (tagId) => {
          stopScan();
          if (tagId === door.tagId) {
            doStartInstallation();
          } else {
            showSnackbar('The pin scanned does not match the one assigned to this door');
          }
        },
      });
    } else {
      doStartInstallation();
    }
  };

  const onSiteSelected = (itemName: string) => {
    setQuery(itemName);
    setHideResults(true);
  };

  return (
    <View style={styles.container}>
      <Autocomplete
        error={submitted && !isValidSite}
        placeholder="Site"
        defaultValue={query}
        data={autocompleteOptions}
        value={query}
        onChangeText={(text) => setQuery(text)}
        renderItem={({ item }) => <Autocomplete.Item text={item.name} onPress={() => onSiteSelected(item.name)} />}
        hideResults={hideResults}
        setHideResults={setHideResults}
      />
      {submitted && !isValidSite && (
        <Text style={{ color: colors.error }}>{!query ? 'Site is required' : 'Please select an existing site'}</Text>
      )}
      <TextInput
        style={styles.marginTop}
        mode="outlined"
        placeholder="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
        maxLength={50}
      />
      <Button style={styles.marginTop} onPress={startInstallation}>
        Start installation
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingBottom: 45,
    zIndex: 999, // needed to prevent details clipping autocomplete dropdown
  },
  marginTop: {
    marginTop: 30,
  },
});
