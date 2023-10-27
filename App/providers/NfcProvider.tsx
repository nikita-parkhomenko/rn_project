import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheetHeader from '../components/BottomSheetHeader';
import NfcDisabledDialog from '../components/NfcDisabledDialog';
import ScanNfcBottomSheet from '../components/ScanNfcBottomSheet';
import NfcContext from '../context/NfcContext';
import useNfc from '../hooks/useNfc';

let NfcManager: any = undefined;
try {
  import('react-native-nfc-manager').then((nfcManager) => (NfcManager = nfcManager.default));
} catch {}

interface NfcProviderProps {
  children: React.ReactNode;
}

export interface NfcOptions {
  onScan: (tagId: string) => void;
  title?: string;
  message?: string;
}

const defaultNfcOptions: NfcOptions = {
  onScan: (_) => {},
  title: 'Scan door',
  message: 'Position device next to NFC Pin',
};

export default function NfcProvider({ children }: NfcProviderProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [tagReadSuccessful, setTagReadSuccessful] = useState(false);
  const [showNfcDisabledDialog, setShowNfcDisabledDialog] = useState(false);
  const [options, setOptions] = useState<NfcOptions>(defaultNfcOptions);
  const { startListening, stopListening, tag } = useNfc();

  const scanNfc = useCallback(
    async (newOptions: NfcOptions) => {
      const nfcSupported = await NfcManager.isSupported();
      if (!nfcSupported) {
        alert('NFC is not supported on this device');
        return;
      }

      if (Platform.OS === 'android') {
        const nfcEnabled = await NfcManager.isEnabled();
        if (!nfcEnabled) {
          setShowNfcDisabledDialog(true);
          return;
        }
      }
      const newOptionsToSet: NfcOptions = { ...defaultNfcOptions, ...newOptions };
      setOptions(newOptionsToSet);
      startListening(newOptionsToSet.message!);
      if (Platform.OS === 'android') {
        bottomSheetRef.current?.snapTo(1);
      }
    },
    [startListening]
  );

  useEffect(() => {
    if (tag) {
      options.onScan(tag);
    }
  }, [tag, options]);

  const stopScan = useCallback(() => {
    stopListening();
    setTagReadSuccessful(true);
    setTimeout(() => {
      bottomSheetRef.current?.snapTo(0);
    }, 1500);
  }, [stopListening]);

  const onBottomSheetClose = () => {
    stopListening();
    setTagReadSuccessful(false);
  };

  const contextValue = { scanNfc, stopScan };
  return (
    <NfcContext.Provider value={contextValue}>
      {children}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[0, '94%']}
        renderContent={() => (
          <ScanNfcBottomSheet tagRead={tagReadSuccessful} message={options.message!} title={options.title!} />
        )}
        renderHeader={() => <BottomSheetHeader />}
        onCloseEnd={onBottomSheetClose}
      />
      <NfcDisabledDialog visible={showNfcDisabledDialog} hide={() => setShowNfcDisabledDialog(false)} />
    </NfcContext.Provider>
  );
}
