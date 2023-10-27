import React, { useState } from 'react';
import { Menu, IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface DoorsTagFilterProps {
  showTagged: boolean;
  setShowTagged: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DoorsTagFilter({ showTagged, setShowTagged }: DoorsTagFilterProps) {
  const [visible, setVisible] = useState(true);

  const toggle = (value: boolean) => {
    setShowTagged(value);
    setVisible(false);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={<IconButton icon="filter-variant" onPress={() => setVisible(true)} />}
    >
      <Menu.Item title="Untagged" onPress={() => toggle(false)} style={!showTagged && styles.selected} />
      <Menu.Item title="Tagged" onPress={() => toggle(true)} style={showTagged && styles.selected} />
    </Menu>
  );
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: 'rgba(17, 17, 26, 0.5)',
  },
});
