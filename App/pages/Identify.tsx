import Constants from 'expo-constants';
import { useEffect } from 'react';
import useScan from '../hooks/useScan';
import Routes from '../routing/Routes';

export default function Identify({ navigation }: any) {
  const { scanNfc, stopScan } = useScan();

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e: any) => {
      // prevent navigating to a blank screen
      e.preventDefault();

      if (Constants.appOwnership === 'expo') {
        alert('NFC not supported on Expo');
      }

      scanNfc({
        onScan: async (tagId) => {
          stopScan();
          navigation.navigate(Routes.Door, { doorTagId: tagId, doorScanned: true });
        },
      });
    });

    return unsubscribe;
  }, [navigation, scanNfc, stopScan]);

  return null;
}
