import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import StorageKeys from '../../../constants/StorageKeys';
import useAuth from '../../../hooks/useAuth';
import { DocumentWithPhotoKey } from '../../../queries';
import { apiUrl } from '../../../services/EnvironmentService';

interface ImageViewOnlyProps {
  photo?: Pick<DocumentWithPhotoKey, 'documentId' | 'photoKey'>;
}

export default function ImageViewOnly({ photo }: ImageViewOnlyProps) {
  const { loggedInUser } = useAuth();
  const [image, setImage] = useState<string>();
  const imageAsString = useRef('');

  const retryMax = 3;

  useEffect(() => {
    let isMounted = true;
    photoDownload(isMounted, 0);

    return () => {
      isMounted = false;
    };
  }, []);

  const photoDownload = async (isMounted: boolean, retryCount: number) => {
    try {
      if (photo !== undefined) {
        const uri = `${apiUrl}/document/${photo.documentId}`;
        //get the latest stored jwt token
        loggedInUser!.jwtHeader = (await AsyncStorage.getItem(StorageKeys.Token)) as string;
        await fetch(uri, { credentials: 'same-origin', headers: { jwt: loggedInUser!.jwtHeader } })
          .then((response) => {
            if (response.status === 401) {
              if (retryCount < retryMax) {
                photoDownload(isMounted, ++retryCount);
              }
            } else {
              return response.blob();
            }
          })
          .then((blob) => {
            if (blob !== undefined) {
              const reader = new FileReader();
              reader.onload = function () {
                imageAsString.current = this.result as string;
                if (isMounted) {
                  setImage(imageAsString.current);
                }
              };
              reader.readAsDataURL(blob);
            }
          })
          .catch((err) => {
            console.log('Error getting image: ' + err);
          });
      }
    } catch (e) {
      console.log('Error in document download: ' + e);
    }
  };

  return (
    <Image
      style={[styles.photo, styles.thumbnail]}
      source={{
        uri: image,
      }}
    />
  );
}

const styles = StyleSheet.create({
  photo: {
    marginTop: 15,
    marginBottom: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
});
