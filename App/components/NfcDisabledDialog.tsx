import React from 'react';
let NfcManager: any = undefined;
try {
  import('react-native-nfc-manager').then((nfcManager) => (NfcManager = nfcManager.default));
} catch {}
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

interface NfcDisabledDialogProps {
  visible: boolean;
  hide: () => void;
}

export default function NfcDisabledDialog({ visible, hide }: NfcDisabledDialogProps) {
  const goToNfcSettings = async () => {
    await NfcManager.goToNfcSetting();
    hide();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hide}>
        <Dialog.Content>
          <Paragraph>Please turn on NFC to use this functionality.</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hide}>Cancel</Button>
          <Button onPress={goToNfcSettings}>Open settings</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
