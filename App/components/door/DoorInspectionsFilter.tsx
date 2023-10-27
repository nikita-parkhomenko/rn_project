import React, { useState } from 'react';
import { Menu, IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import DoorStatus from '../../constants/DoorStatus';

export interface DoorFilter {
  statuses: DoorStatus[];
  tagged?: boolean;
}

interface DoorsInspectionsFilterProps {
  filter: DoorFilter;
  setFilter: (filter: DoorFilter) => void;
}

export default function DoorsInspectionsFilter({ filter, setFilter }: DoorsInspectionsFilterProps) {
  const [visible, setVisible] = useState(true);

  const selectStatus = (newFilter: DoorFilter) => {
    setFilter(newFilter);
    setVisible(false);
  };

  const { statuses } = filter;
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
              DoorStatus.InspectionDue,
              DoorStatus.InspectionOverdue,
              DoorStatus.InspectionFailedSignOff,
              DoorStatus.Inspecting,
              DoorStatus.InspectionRequiresSignOff,
            ],
          })
        }
        style={statuses.length === 4 && styles.selected}
      />
      <Menu.Item
        title="Inspecting"
        onPress={() => selectStatus({ tagged: undefined, statuses: [DoorStatus.Inspecting] })}
        style={statuses.includes(DoorStatus.Inspecting) && statuses.length === 1 && styles.selected}
      />
      <Menu.Item
        title="Req sign off"
        onPress={() => selectStatus({ tagged: undefined, statuses: [DoorStatus.InspectionRequiresSignOff] })}
        style={statuses.includes(DoorStatus.InspectionRequiresSignOff) && statuses.length === 1 && styles.selected}
      />
      <Menu.Item
        title="Ready for Inspection"
        onPress={() =>
          selectStatus({
            statuses: [DoorStatus.InspectionDue, DoorStatus.InspectionOverdue, DoorStatus.InspectionFailedSignOff],
          })
        }
        style={statuses.length === 3 && styles.selected}
      />
    </Menu>
  );
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: 'rgba(17, 17, 26, 0.5)',
  },
});
