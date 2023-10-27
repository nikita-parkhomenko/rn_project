// outsource dependencies
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Title, Caption, Divider } from 'react-native-paper';

interface CompanyDetailsProps {
  title: string;
  name: string;
  adminName?: string;
  adminEmail?: string;
  contactPhone?: string | null;
}

const CompanyDetails = ({ title, name, adminName, adminEmail, contactPhone }: CompanyDetailsProps) => {
  return (
    <Surface style={styles.surface}>
      <Title style={styles.detailsTitle}>{title}</Title>
      <Divider />
      <View style={styles.row}>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>Company name</Title>
          <Caption style={styles.text}>{name}</Caption>
        </View>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>Admin name</Title>
          <Caption style={styles.text}>{adminName ? adminName : '-'}</Caption>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>Admin email</Title>
          <Caption style={styles.text}>{adminEmail ? adminEmail : '-'}</Caption>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>Contact phone</Title>
          <Caption style={styles.text}>{contactPhone ? contactPhone : '-'}</Caption>
        </View>
      </View>
    </Surface>
  );
};

export default CompanyDetails;

const styles = StyleSheet.create({
  surface: {
    marginBottom: 20,
    padding: 15,
  },
  detailsTitle: {
    marginBottom: 10,
  },
  title: {
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    marginTop: 15,
  },
  detail: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
});
