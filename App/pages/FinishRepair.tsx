// outsource dependencies
import React, { useState } from 'react';
import { ReactNativeFile } from 'apollo-upload-client';
import { TextInput, HelperText } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { View, StyleSheet, ScrollView } from 'react-native';

// local dependencies
import Routes from '../routing/Routes';
import Button from '../components/Button';
import useSnackbar from '../hooks/useSnackbar';
import PageTitle from '../components/PageTitle';
import { useRepairDoorMutation } from '../queries';
import { backgroundColor } from '../constants/Style';
import { Photo } from '../stores/QuestionPhotosStore';
import { RepairStackParamList } from '../routing/RepairStackScreen';

type FinishRepairNavigationProps = StackScreenProps<RepairStackParamList, Routes.FinishRepair>;

export default function FinishRepair({ navigation, route }: FinishRepairNavigationProps) {
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [comment, setComment] = useState('');
  const { showSnackbar } = useSnackbar();
  const [repairDoorMutation, { loading }] = useRepairDoorMutation();
  const { photos, doorId } = route.params;

  const submitRepairHandler = async () => {
    try {
      await repairDoorMutation({
        variables: {
          repairDoorInput: {
            id: Number(doorId),
            reason: comment,
            photos: photos.map(
              (p: Photo) =>
                new ReactNativeFile({
                  uri: p.uri,
                  type: 'image/jpeg',
                  name: p.filename,
                })
            ),
          },
        },
      });

      showSnackbar('Repair has been submitted');
      navigation.navigate(Routes.RepairDoors);
    } catch (error) {
      showSnackbar('There was an error completing the repair, please try again later');
    }
  };

  const changeTextHandler = (text: string) => {
    setComment(text);
    setShowValidationMessage(false);
  };

  return (
    <View style={styles.container}>
      <PageTitle title="Please specify the repair carried out and any replacement parts" />
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.commentContainer}>
            <TextInput
              multiline
              mode="outlined"
              numberOfLines={10}
              label="Repair comment"
              error={showValidationMessage}
              style={styles.commentTextInput}
              onChangeText={changeTextHandler}
              onBlur={() => setShowValidationMessage(comment.length < 5)}
            />
          </View>
          <HelperText type="error" visible={showValidationMessage}>
            Repair comment is required and must be at least 5 characters long
          </HelperText>
        </View>
      </ScrollView>
      <View style={styles.button}>
        <Button disabled={comment.length < 5 || loading} loading={loading} onPress={submitRepairHandler}>
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
    paddingVertical: 20,
    flexWrap: 'wrap',
  },
  commentContainer: {
    flex: 1,
    padding: 10,
  },
  commentTextInput: {
    flex: 1,
  },
  button: {
    padding: 30,
  },
});
