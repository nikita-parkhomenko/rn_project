// outsource dependencies
import React, { useState } from 'react';
import { ReactNativeFile } from 'apollo-upload-client';
import { StackScreenProps } from '@react-navigation/stack';
import { View, StyleSheet, ScrollView } from 'react-native';
import { HelperText, TextInput, Title } from 'react-native-paper';

// local dependencies
import Routes from '../routing/Routes';
import Button from '../components/Button';
import useSnackbar from '../hooks/useSnackbar';
import PageTitle from '../components/PageTitle';
import { backgroundColor } from '../constants/Style';
import { Photo } from '../stores/QuestionPhotosStore';
import { RepairStackParamList } from '../routing/RepairStackScreen';
import PhotoEvidence from '../components/door/common/PhotoEvidence';
import { useRetireDoorsMutation, RetireDoorInput } from '../queries';

type RetireDoorRecordNavigationProps = StackScreenProps<RepairStackParamList, Routes.FinishRepair>;

export default function RetireDoorRecord({ navigation, route }: RetireDoorRecordNavigationProps) {
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [reason, setReason] = useState('');
  const { showSnackbar } = useSnackbar();
  const [retireDoors, { loading }] = useRetireDoorsMutation();
  const { doorId } = route.params;

  const onPhotoRemove = (photo: Photo) => {
    setPhotos((prev) => prev.filter((p) => p.uri !== photo.uri));
  };

  const onPhotoTaken = (photo: Photo) => {
    setPhotos((prev) => [...prev, photo]);
  };

  const submitHandler = async () => {
    const data: RetireDoorInput = {
      ids: [Number(doorId)],
      isMobileRetirement: true,
      reason,
    };
    if (photos.length) {
      data.photos = photos.map(
        (p: Photo) =>
          new ReactNativeFile({
            uri: p.uri,
            type: 'image/jpeg',
            name: p.filename,
          })
      );
    }
    try {
      await retireDoors({
        variables: {
          retireDoorInput: data,
        },
      });
      showSnackbar('Door retired');
      navigation.navigate(Routes.RepairDoors);
    } catch (error) {
      console.log(error);
      showSnackbar('There was an error completing the retire, please try again later');
    }
  };

  const changeTextHandler = (text: string) => {
    setReason(text);
    setShowValidationMessage(false);
  };

  return (
    <View style={styles.container}>
      <PageTitle title="Retire door record" />
      <ScrollView>
        <Title style={styles.title}>
          Retiring a door should only be used when removing or replacing a door. This process cannot be undone
        </Title>
        <View style={styles.wrapper}>
          <View style={styles.commentContainer}>
            <TextInput
              multiline
              label="Reason"
              mode="outlined"
              numberOfLines={4}
              error={showValidationMessage}
              style={styles.commentTextInput}
              onChangeText={changeTextHandler}
              onBlur={() => setShowValidationMessage(reason.length < 5)}
            />
          </View>
          <HelperText type="error" visible={showValidationMessage}>
            Retire reason is required and must be at least 5 characters long
          </HelperText>
        </View>
        <View style={styles.photosContainer}>
          <PhotoEvidence photos={photos} onPhotoRemove={onPhotoRemove} onPhotoTaken={onPhotoTaken} />
        </View>
      </ScrollView>
      <View style={styles.button}>
        <Button disabled={reason.length < 5 || loading} loading={loading} onPress={submitHandler}>
          Submit
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  wrapper: {
    flex: 1,
    paddingTop: 10,
    flexWrap: 'wrap',
  },
  commentContainer: {
    flex: 1,
    padding: 10,
  },
  photosContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  commentTextInput: {
    flex: 1,
  },
  button: {
    padding: 30,
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    paddingTop: 20,
    paddingHorizontal: 20,
    fontSize: 16,
    lineHeight: 18,
  },
});
