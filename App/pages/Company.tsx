// outsource dependencies
import React from 'react';
import { Text } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';

// local dependencies
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';
import { useCompanyQuery } from '../queries';
import PageTitle from '../components/PageTitle';
import { backgroundColor } from '../constants/Style';
import CompanyDetails from '../components/company-info/CompanyDetails';
import CompanyPermissions from '../components/company-info/CompanyPermissions';
import CompanyBillingInfo from '../components/company-info/CompanyBillingInfo';

const Company = () => {
  const { loggedInUser } = useAuth();
  const { data, loading, error } = useCompanyQuery({
    fetchPolicy: 'cache-and-network',
    variables: { id: loggedInUser?.companyId || '' },
  });
  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>There was an error fetching the company information</Text>
      </View>
    );
  }
  if (loading) {
    return <Spinner />;
  }
  const permissions = data?.company.types.map((type) => ({
    name: type.code,
    id: type.id,
  }));
  return (
    <ScrollView style={styles.container}>
      <PageTitle title={loggedInUser?.companyName || 'No company name'} />
      <CompanyDetails
        title="Company details"
        adminEmail={data?.company.admin.email}
        adminName={data?.company.admin.fullName}
        contactPhone={data?.company.contactPhone}
        name={data?.company.name || 'No company name'}
      />
      <CompanyPermissions title="Permissions" permissions={permissions} />
      <CompanyBillingInfo
        title="Billing information"
        billingCity={data?.company.billingCity}
        billingEmail={data?.company.billingEmail}
        billingPostcode={data?.company.billingPostcode}
        billingAddressOne={data?.company.billingAddressOne}
        billingAddressTwo={data?.company.billingAddressTwo}
      />
    </ScrollView>
  );
};

export default Company;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
