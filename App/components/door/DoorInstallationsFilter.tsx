import React, { useState } from 'react';
import { Menu, IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import DoorStatus from '../../constants/DoorStatus';

export interface DoorFilter {
  statuses: DoorStatus[];
  tagged?: boolean;
}

interface DoorsInstallationsFilterProps {
  filter: DoorFilter;
  setFilter: (filter: DoorFilter) => void;
}

export default function DoorsInstallationsFilter({ filter, setFilter }: DoorsInstallationsFilterProps) {
  const [visible, setVisible] = useState(false);

  const selectStatus = (newFilter: DoorFilter) => {
    setFilter(newFilter);
    setVisible(false);
  };

  const { statuses, tagged } = filter;
  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={<IconButton icon="filter-variant" onPress={() => setVisible(true)} />}
    >
      <Menu.Item
        title="No filter"
        onPress={() =>
          selectStatus({
            tagged: undefined,
            statuses: [
              DoorStatus.InstallerReady,
              DoorStatus.InstallerInstalling,
              DoorStatus.InstallerRequiresSignOff,
              DoorStatus.InstallerFailedSignOff,
              DoorStatus.RequiresRepair,
            ],
          })
        }
        style={statuses.length === 4 && styles.selected}
      />
      <Menu.Item
        title="Installing"
        onPress={() => selectStatus({ tagged: undefined, statuses: [DoorStatus.InstallerInstalling] })}
        style={statuses.includes(DoorStatus.InstallerInstalling) && statuses.length === 1 && styles.selected}
      />
      <Menu.Item
        title="Req sign off"
        onPress={() => selectStatus({ tagged: undefined, statuses: [DoorStatus.InstallerRequiresSignOff] })}
        style={statuses.includes(DoorStatus.InstallerRequiresSignOff) && statuses.length === 1 && styles.selected}
      />
      <Menu.Item
        title="Req repair"
        onPress={() => selectStatus({ tagged: undefined, statuses: [DoorStatus.RequiresRepair] })}
        style={statuses.includes(DoorStatus.RequiresRepair) && statuses.length === 1 && !tagged && styles.selected}
      />
      <Menu.Item
        title="Tagged"
        onPress={() => selectStatus({ tagged: true, statuses: [DoorStatus.InstallerReady] })}
        style={statuses.includes(DoorStatus.InstallerReady) && statuses.length === 1 && tagged && styles.selected}
      />
      <Menu.Item
        title="Untagged"
        onPress={() => selectStatus({ tagged: false, statuses: [DoorStatus.InstallerReady] })}
        style={statuses.includes(DoorStatus.InstallerReady) && statuses.length === 1 && !tagged && styles.selected}
      />
    </Menu>
  );
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: 'rgba(17, 17, 26, 0.5)',
  },
});
