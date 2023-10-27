// outsource dependencies
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Title, Caption, Divider } from 'react-native-paper';

interface CompanyBillingInfoProps {
  title: string;
  billingCity?: string | null;
  billingEmail?: string | null;
  billingAddressOne?: string | null;
  billingAddressTwo?: string | null;
  billingPostcode?: string | null;
}

const CompanyBillingInfo = ({
  title,
  billingCity,
  billingEmail,
  billingAddressOne,
  billingAddressTwo,
  billingPostcode,
}: CompanyBillingInfoProps) => {
  return (
    <Surface style={styles.surface}>
      <Title style={styles.detailsTitle}>{title}</Title>
      <Divider />
      <View style={styles.row}>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>Billing email</Title>
          <Caption style={styles.text}>{billingEmail ? billingEmail : '-'}</Caption>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>Town/City</Title>
          <Caption style={styles.text}>{billingCity ? billingCity : '-'}</Caption>
        </View>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>Address line 1</Title>
          <Caption style={styles.text}>{billingAddressOne ? billingAddressOne : '-'}</Caption>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>Postcode</Title>
          <Caption style={styles.text}>{billingPostcode ? billingPostcode : '-'}</Caption>
        </View>
        <View style={styles.detail}>
          <Title style={[styles.text, styles.title]}>Address line 2</Title>
          <Caption style={styles.text}>{billingAddressTwo ? billingAddressTwo : '-'}</Caption>
        </View>
      </View>
    </Surface>
  );
};

export default CompanyBillingInfo;

const styles = StyleSheet.create({
  surface: {
    marginBottom: 20,
    padding: 15,
  },
  detailsTitle: {
    marginBottom: 15,
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
