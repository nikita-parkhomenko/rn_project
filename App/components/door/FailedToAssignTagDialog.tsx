import React from 'react';
import { Portal, Dialog, Paragraph, Button } from 'react-native-paper';

interface FailedToAssignTagDialogProps {
  visible: boolean;
  hide: () => void;
  errorMessage?: string;
}

export default function FailedToAssignTagDialog({ visible, hide, errorMessage }: FailedToAssignTagDialogProps) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hide}>
        <Dialog.Title>Failed to assign tag</Dialog.Title>
        <Dialog.Content>
          <Paragraph>The following errors occurred:</Paragraph>
          <Paragraph>{errorMessage}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button style={{ marginRight: 20, marginBottom: 10 }} onPress={hide}>
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
