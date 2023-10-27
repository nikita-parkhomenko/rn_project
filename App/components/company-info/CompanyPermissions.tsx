// outsource dependencies
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Title, Chip, Divider } from 'react-native-paper';

interface CompanyPermissionsProps {
  title: string;
  permissions: { id: number; name: string }[] | undefined;
}

const CompanyPermissions = ({ title, permissions }: CompanyPermissionsProps) => {
  return (
    <Surface style={styles.surface}>
      <Title style={styles.permissionTitle}>{title}</Title>
      <Divider />
      <View style={styles.row}>
        {permissions &&
          permissions.map(({ name, id }) => (
            <Chip style={styles.chip} key={id}>
              {name}
            </Chip>
          ))}
      </View>
    </Surface>
  );
};

export default CompanyPermissions;

const styles = StyleSheet.create({
  surface: {
    marginBottom: 20,
    padding: 15,
  },
  permissionTitle: {
    marginBottom: 15,
  },
  row: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    textAlign: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
});
