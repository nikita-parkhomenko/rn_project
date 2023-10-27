import { StackScreenProps } from '@react-navigation/stack';
import { ReactNativeFile } from 'apollo-upload-client';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native-paper';
import BackgroundGlitchFix from '../components/BackgroundGlitchFix';
import Button from '../components/Button';
import PhotoEvidence from '../components/door/common/PhotoEvidence';
import PageTitle from '../components/PageTitle';
import { backgroundColor } from '../constants/Style';
import useSnackbar from '../hooks/useSnackbar';
import { useRecordDoorNotAccessibleMutation } from '../queries';
import { InspectionStackParamList } from '../routing/InspectionsStackScreen';
import Routes from '../routing/Routes';
import { Photo } from '../stores/QuestionPhotosStore';

type DoorNotAccessibleNavigationProp = StackScreenProps<InspectionStackParamList, Routes.DoorNotAccessible>;

export default function DoorNotAccessible({ route, navigation }: DoorNotAccessibleNavigationProp) {
  const [message, setMessage] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { showSnackbar } = useSnackbar();
  const [submit, { loading }] = useRecordDoorNotAccessibleMutation();
  const { doorId } = route.params;

  const onSubmit = async () => {
    try {
      await submit({
        variables: {
          details: {
            reason: message,
            date: new Date(),
            doorId,
            photos: photos.map((p) => {
              return new ReactNativeFile({
                uri: p.uri,
                type: 'image/jpeg',
                name: p.filename,
              });
            }),
          },
        },
      });

      showSnackbar('Access report has been submitted');
      navigation.goBack();
    } catch (e) {
      console.log(e);
      showSnackbar('There was an error attempting to submit this report');
    }
  };

  const onPhotoRemove = (photo: Photo) => {
    setPhotos((prev) => prev.filter((p) => p.uri !== photo.uri));
  };

  const onPhotoTaken = (photo: Photo) => {
    setPhotos((prev) => [...prev, photo]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <View style={styles.container}>
          <BackgroundGlitchFix />
          <PageTitle title="Door not accessible" />
          <View style={styles.body}>
            <View style={styles.flex}>
              <TextInput
                multiline
                label="Reason"
                mode="outlined"
                style={styles.commentTextInput}
                onChangeText={(text) => setMessage(text)}
              />
            </View>
            <PhotoEvidence photos={photos} onPhotoRemove={onPhotoRemove} onPhotoTaken={onPhotoTaken} />
            <View style={styles.buttonContainer}>
              <Button onPress={onSubmit} disabled={!message || loading} loading={loading}>
                Submit
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  flex: { flex: 1 },
  commentTextInput: {
    height: '100%',
  },
  buttonContainer: {
    paddingTop: 15,
    paddingBottom: 25,
  },
});
