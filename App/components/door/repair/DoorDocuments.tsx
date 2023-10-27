// outsource dependencies
import Constants from 'expo-constants';
import React, { useState } from 'react';
import { Text, List } from 'react-native-paper';
import { Platform, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';

// local dependencies
import useAuth from '../../../hooks/useAuth';
import { apiUrl } from '../../../services/EnvironmentService';
import { backgroundColor, primaryColour } from '../../../constants/Style';

let RNFetchBlob: any = undefined;
try {
  if (Constants.appOwnership !== 'expo') {
    import('rn-fetch-blob').then((blob) => (RNFetchBlob = blob.default));
  }
} catch (e) {}

interface DoorDocumentsProps {
  documents: any[];
}

interface File {
  id: string;
  originalFilename: string;
}

export default function DoorDocuments({ documents }: DoorDocumentsProps) {
  const { loggedInUser } = useAuth();
  const [error, setError] = useState(false);
  const jwt: string | undefined = loggedInUser?.jwtHeader;

  if (Constants.appOwnership === 'expo') {
    return (
      <View style={styles.container}>
        <Text>You cannot view PDFs on Expo</Text>
      </View>
    );
  }

  const downloadFile = async (file: File) => {
    const documentUri = `${apiUrl}/document/${file.id}`;
    const dir = Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DCIMDir;
    const path = `${dir}/${file.id}${file.originalFilename}`;

    const options = {
      fileCache: true,
      appendExt: 'pdf',
      path, // This is the path where your downloaded file will live in
      addAndroidDownloads: {
        useDownloadManager: true, // Setting it to true will use the device's native download manager and will be shown in the notification bar.
        title: 'Downloading file',
        mime: 'application/pdf',
        mediaScannable: true,
        notification: true,
        description: 'File downloaded by download manager.',
        path, // this is the path where your downloaded file will live in
      },
    };

    await RNFetchBlob.config(options)
      .fetch('GET', documentUri, {
        jwt,
        'Content-Type': 'application/pdf',
      })
      .then((response: any) => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.ios.openDocument(response.data);
        }
        if (Platform.OS === 'android') {
          RNFetchBlob.android.actionViewIntent(response.path(), 'application/pdf');
        }
      })
      .catch((errorMessage: any) => {
        setError(errorMessage);
      });
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>There was an error attempting to view documents</Text>
      </View>
    );
  }

  if (documents.length) {
    return (
      <View style={styles.container}>
        <FlatList
          data={documents}
          keyExtractor={(item) => item.id as string}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity style={styles.wrapper} onPress={() => downloadFile(item)}>
                <List.Icon icon="file" />
                <Text style={styles.text}>Download {item.documentType.name}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>There is no documents available for this door</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: backgroundColor,
  },
  wrapper: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: primaryColour,
  },
  text: {
    color: '#fff',
    lineHeight: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
