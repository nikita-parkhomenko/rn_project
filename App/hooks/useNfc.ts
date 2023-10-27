import Constants from 'expo-constants';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { ConvertNfcIosSerialNumber } from '../services/NfcHelperService';

let NfcManager: any = undefined;
let NfcTech: any = undefined;
let NfcEvents: any = undefined;
try {
  import('react-native-nfc-manager').then((nfcModule) => (NfcManager = nfcModule.default));
  import('react-native-nfc-manager').then((nfcModule) => (NfcTech = nfcModule.NfcTech));
  import('react-native-nfc-manager').then((nfcModule) => (NfcEvents = nfcModule.NfcEvents));
} catch {}

export default function useNfc() {
  const [tag, setTag] = useState<string>();
  const [stoppedListeningAt, setStoppedListeningAt] = useState<number>();
  const [timeoutScheduled, setTimeoutScheduled] = useState<boolean>(false);

  useEffect(() => {
    if (Constants.appOwnership !== 'expo') {
      console.log('component mounted - starting nfc');
      NfcManager.start();
    }

    return () => {
      if (Constants.appOwnership !== 'expo') {
        console.log('component unmounted - cleanup nfc');
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
        NfcManager.cancelTechnologyRequest().catch(() => 0);
      }
    };
  }, []);

  const onStopListening = async () => {
    if (Platform.OS === 'android') {
      console.log('cleanup NFC for Android');
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.unregisterTagEvent().catch(() => 0);
    } else {
      console.log('cleanup NFC for iOS');
      try {
        await NfcManager.cancelTechnologyRequest();
        console.log('Cancelled');
      } catch {
        console.log('Cancelled catch');
      }
    }
  };

  const stopListening = useCallback(async () => {
    setStoppedListeningAt(new Date().getTime());
    await onStopListening();
  }, []);

  const onStartListening = useCallback(
    async (iosMessage: string) => {
      if (Platform.OS === 'android') {
        console.log('starting the listener for Android');
        await NfcManager.registerTagEvent();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
          setTag(tag.id?.toString());
        });
      } else {
        try {
          console.log('requesting NFC for iOS');
          await NfcManager.requestTechnology(NfcTech.Ndef, {
            alertMessage: iosMessage,
          });
          const tag = await NfcManager.getTag();
          const formattedId = ConvertNfcIosSerialNumber(tag?.id?.toString());
          setTag(formattedId);
        } catch (e) {
          console.log('iOS NFC scan an error was received.', e);
        } finally {
          await stopListening();
        }
      }
    },
    [stopListening]
  );

  const startListening = useCallback(
    async (iosMessage: string) => {
      setTag(undefined);
      const NB_MILLIS_WAIT = 2000;
      if (timeoutScheduled) {
        return;
      }
      let dt = Number.MAX_SAFE_INTEGER;
      if (stoppedListeningAt) {
        dt = new Date().getTime() - stoppedListeningAt;
      }
      if (dt > NB_MILLIS_WAIT || Platform.OS === 'android') {
        // Android does not need this shenanigans, so start listening straight away
        await onStartListening(iosMessage);
      } else {
        // last scan was too close to now. schedule a scan in sometime
        // schedule a timeout that will run NB_MILLIS_WAIT milliseconds after the last scan popup was closed
        setTimeout(() => {
          setTimeoutScheduled(false);
          onStartListening(iosMessage);
        }, NB_MILLIS_WAIT - dt);
        setTimeoutScheduled(true);
      }
    },
    [onStartListening, stoppedListeningAt, timeoutScheduled]
  );

  return { startListening, stopListening, tag };
}
