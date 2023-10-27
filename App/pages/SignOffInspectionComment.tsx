import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import SignOffComment from '../components/door/common/SignOffComment';
import useSnackbar from '../hooks/useSnackbar';
import { useFailureRisksQuery, useSignOffInspectionMutation } from '../queries';
import { InspectionStackParamList } from '../routing/InspectionsStackScreen';
import Routes from '../routing/Routes';

type SignOffInspectionCommentProps = StackScreenProps<InspectionStackParamList, Routes.SignOffInspectionComment>;

export default function SignOffInspectionComment({ navigation, route }: SignOffInspectionCommentProps) {
  const [selectedFailureRisk, setSelectedFailureRisk] = useState<number | undefined>();
  const [pickerOptions, setPickerOptions] = useState<Item[]>([]);
  const [signOffInspectionMutation] = useSignOffInspectionMutation();
  const { data } = useFailureRisksQuery();
  const { showSnackbar } = useSnackbar();
  const { isSuccess, doorId } = route.params;
  const pageTitle = isSuccess ? 'Sign off inspection' : 'Fail inspection';
  const commentLabel = isSuccess ? 'Inspection comments' : 'Failure reason';
  const snackbarSuccessMessage = isSuccess ? 'Inspection signed off' : 'Inspection failed';

  useEffect(() => {
    if (data) {
      setPickerOptions(data.failureRisks.map((x) => ({ label: x.name, value: x.id })));
    }
  }, [data]);

  const onSubmit = async (message: string) => {
    try {
      await signOffInspectionMutation({
        variables: {
          doorId: String(doorId),
          isSuccess: isSuccess,
          message,
          failureRiskId: selectedFailureRisk ? selectedFailureRisk.toString() : null,
        },
      });
      showSnackbar(snackbarSuccessMessage);
      navigation.navigate(Routes.InspectorDoors);
    } catch (e) {
      console.log(e);
      showSnackbar('There was an error submitting this operation: ' + e.message);
    }
  };

  const submitEnabled = isSuccess ? true : Boolean(selectedFailureRisk);

  return (
    <SignOffComment
      onSubmit={onSubmit}
      pageTitle={pageTitle}
      commentLabel={commentLabel}
      submitEnabled={submitEnabled}
      commentRequired={!isSuccess}
    >
      {!isSuccess && (
        <>
          <Paragraph style={styles.text}>It is my opinion that this door requires some work and is a:</Paragraph>
          <RNPickerSelect
            placeholder={{ label: 'Select a failure risk', value: null }}
            items={pickerOptions}
            style={pickerSelectStyles}
            onValueChange={(value: number) => setSelectedFailureRisk(value)}
            value={selectedFailureRisk}
            useNativeAndroidPickerStyle={false}
          />
        </>
      )}
    </SignOffComment>
  );
}

const styles = StyleSheet.create({
  dropdownStyle: {
    color: '#a5a6b8',
    height: 50,
    borderWidth: 1,
    borderColor: '#a5a6b8',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  text: {
    paddingTop: 30,
    paddingBottom: 15,
    opacity: 0.7,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    ...styles.dropdownStyle,
  },
  inputIOS: {
    ...styles.dropdownStyle,
  },
});
