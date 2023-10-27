import React from 'react';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

interface PhotoEvidenceRemoveDialogProps {
  visible: boolean;
  onClose: (result: boolean) => void;
}

export default function PhotoEvidenceRemoveDialog({ visible, onClose }: PhotoEvidenceRemoveDialogProps) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => onClose(false)}>
        <Dialog.Title>Remove photo</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Are you sure you want to remove this photo?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => onClose(false)}>No</Button>
          <Button onPress={() => onClose(true)}>Yes</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
