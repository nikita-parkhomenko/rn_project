import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Caption } from 'react-native-paper';
import { DocumentWithPhotoKey, useFireStoppingTypesQuery } from '../../../queries';
import ImageViewOnly from '../common/ImageViewOnly';

interface AnswerViewOnlyProps {
  caption?: string;
  answer: string;
  photos?: Pick<DocumentWithPhotoKey, 'documentId' | 'photoKey'>[];
  additionalText?: string;
  fireStop?: boolean;
}

export default function AnswerViewOnly({ caption, answer, photos, additionalText, fireStop }: AnswerViewOnlyProps) {
  const answerParsed = JSON.parse(answer);

  if (answer.includes('fixingsPerJamb')) {
    additionalText = 'Fixings per jamb: ' + answerParsed.fixingsPerJamb;
  }

  const { data: fireStoppingTypes } = useFireStoppingTypesQuery();

  if (fireStop) {
    //retrieve the names for the firestop enum from the Defintition.FireStoppingType table
    //retrieve the firestop option name
    const fireStopIndex = answerParsed.value as number;
    answerParsed.value = fireStoppingTypes?.fireStoppingTypes[fireStopIndex - 1].name;
  }

  const photoDescription: string[] = setPhotoDescriptions(photos);

  let answerParsedValueString = '';
  if (answerParsed.value !== undefined && typeof answerParsed.value !== 'boolean') {
    answerParsedValueString = (answerParsed.value as string)?.toUpperCase();
  }

  const colorStyle =
    typeof answerParsed.value === 'boolean'
      ? answerParsed.value === true
        ? styles.yesAnswer
        : styles.noAnswer
      : answerParsedValueString === 'N/A'
      ? styles.naAnswer
      : answerParsedValueString === 'YES'
      ? styles.yesAnswer
      : styles.noAnswer;

  return (
    <>
      {caption && <Caption style={styles.marginBottom}>{caption}</Caption>}
      <Text style={[colorStyle, styles.answer]}>
        {typeof answerParsed.value === 'boolean'
          ? answerParsed.value === true
            ? 'YES'
            : 'NO'
          : answerParsedValueString}
      </Text>
      {additionalText && <Text style={styles.answer}>{additionalText}</Text>}
      <View style={styles.container}>
        {photos?.map((photo, i) => (
          <View key={'photoKey' + i + photo.documentId} style={styles.photoContainer}>
            <Text style={styles.photoKeyFont}>{photoDescription[i]}</Text>
            <ImageViewOnly photo={photo} />
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 15,
  },
  marginTop: {
    marginTop: 15,
  },
  photoKeyFont: {
    color: 'white',
  },
  container: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -10,
  },
  photoContainer: {
    marginHorizontal: 8,
  },
  answer: {
    borderStyle: 'solid',
    padding: 10,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  yesAnswer: {
    backgroundColor: '#00BA90',
  },
  noAnswer: {
    backgroundColor: '#FF675F',
  },
  naAnswer: {
    backgroundColor: '#44445D',
  },
});

const setPhotoDescriptions = (photos: Pick<DocumentWithPhotoKey, 'documentId' | 'photoKey'>[] | undefined) => {
  const photoDescription: string[] = [];
  photos?.forEach((photo) => {
    switch (photo.photoKey) {
      case 'leftJamb':
        photoDescription.push('Left jamb');
        break;
      case 'rightJamb':
        photoDescription.push('Right jamb');
        break;
      case 'head':
        photoDescription.push('Head');
        break;
      case 'inside':
        photoDescription.push('Inside');
        break;
      case 'outside':
        photoDescription.push('Outside');
        break;
      default:
        photoDescription.push('');
        break;
    }
  });
  return photoDescription;
};
