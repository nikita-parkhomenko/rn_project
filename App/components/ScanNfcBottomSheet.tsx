import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Title, Subheading } from 'react-native-paper';

const scanImage = require('../assets/Scan.png');
const scanConfirmImage = require('../assets/Scan_confirm.png');

interface ScanNfcBottomSheetProps {
  tagRead: boolean;
  title: string;
  message: string;
}

export default function ScanNfcBottomSheet({ tagRead, title, message }: ScanNfcBottomSheetProps) {
  const image = tagRead ? scanConfirmImage : scanImage;
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Title style={styles.title}>{title}</Title>
        <Subheading style={styles.subheading}>{message}</Subheading>
      </View>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  textContainer: {
    marginTop: 30,
    paddingHorizontal: 50,
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 31,
  },
  subheading: {
    marginTop: 8,
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: 0.8,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
