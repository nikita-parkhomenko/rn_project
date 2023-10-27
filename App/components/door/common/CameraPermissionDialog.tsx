import React from 'react';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

interface CameraPermissionDialogProps {
  visible: boolean;
  hide: () => void;
  message: string;
}

export default function CameraPermissionDialog({ visible, hide, message }: CameraPermissionDialogProps) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hide}>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hide}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
