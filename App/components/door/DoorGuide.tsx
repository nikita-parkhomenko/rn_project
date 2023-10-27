import Constants from 'expo-constants';
import React, { useState } from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { backgroundColor } from '../../constants/Style';
import { apiUrl } from '../../services/EnvironmentService';
import sha1 from 'crypto-js/sha1';
import useAuth from '../../hooks/useAuth';
import { getOperationDefinition } from '@apollo/client/utilities';
import StorageKeys from '../../constants/StorageKeys';

let Pdf: any = undefined;
try {
  if (Constants.appOwnership !== 'expo') {
    import('react-native-pdf').then((pdf) => (Pdf = pdf.default));
  }
} catch (e) {
  // Handle failure from loading the module
}

let RNFetchBlob: any = undefined;
try {
  if (Constants.appOwnership !== 'expo') {
    import('rn-fetch-blob').then((blob) => (RNFetchBlob = blob.default));
  }
} catch (e) {}

interface DoorGuideProps {
  documentId?: string;
}

export default function DoorGuide({ documentId }: DoorGuideProps) {
  const { loggedInUser } = useAuth();
  const [error, setError] = useState(false);
  const documentUri = `${apiUrl}/document/${documentId}`;

  if (Constants.appOwnership === 'expo') {
    return (
      <View style={styles.container}>
        <Text>You cannot view PDFs on Expo</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>There was an error attempting to view the installation guide</Text>
      </View>
    );
  }

  const onError = async (err: any) => {
    setError(err);
    if (RNFetchBlob) {
      // https://github.com/wonday/react-native-pdf/issues/486
      const cachedFile = RNFetchBlob.fs.dirs.CacheDir + '/' + sha1(documentUri) + '.pdf';
      try {
        // removing manually error cache to be able to try again next time
        await RNFetchBlob.fs.unlink(cachedFile);
      } catch (err) {}
    }
  };

  if (documentId) {
    // it seems to automagically pass the cookie with this request
    return (
      <Pdf
        style={styles.pdf}
        source={{ uri: documentUri, cache: true, jwt: loggedInUser?.jwtHeader }}
        onError={onError}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>There is no installation guide available for this door</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  text: {
    textAlign: 'center',
    lineHeight: 20,
  },
});
