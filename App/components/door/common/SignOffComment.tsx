import * as React from 'react';
import { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import BackgroundGlitchFix from '../../BackgroundGlitchFix';
import Button from '../../Button';
import PageTitle from '../../PageTitle';
import { backgroundColor } from '../../../constants/Style';

interface SignOffCommentProps {
  onSubmit: (comment: string) => void;
  pageTitle: string;
  commentLabel: string;
  submitEnabled?: boolean;
  commentRequired?: boolean;
  children?: React.ReactNode;
}

export default function SignOffComment({
  onSubmit,
  pageTitle,
  commentLabel,
  children,
  commentRequired = false,
  submitEnabled = true,
}: SignOffCommentProps) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (e) => {
      setKeyboardVisible(true); // or some other action
      setKeyboardHeight(e.endCoordinates.height);
    });
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardVisible(true); // or some other action
      setKeyboardHeight(e.endCoordinates.height);
    });
    const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardVisible(false); // or some other action
      setKeyboardHeight(0);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // or some other action
      setKeyboardHeight(0);
    });

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const submit = () => {
    onSubmit(message);
  };

  const commentRequiredAndValid = commentRequired ? Boolean(message) : true;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <BackgroundGlitchFix />
        <PageTitle title={pageTitle} />
        <View style={styles.body}>
          <View style={styles.commentContainer}>
            <TextInput
              multiline
              label={commentLabel}
              mode="outlined"
              style={styles.commentTextInput}
              onChangeText={(text) => setMessage(text)}
            />
          </View>
          {children}
          <View style={styles.buttonContainer}>
            <Button onPress={submit} disabled={!submitEnabled || !commentRequiredAndValid}>
              Submit
            </Button>
          </View>
        </View>
        {isKeyboardVisible && (
          <KeyboardAvoidingView behavior="padding">
            <View style={{ height: keyboardHeight - 75 }}></View>
          </KeyboardAvoidingView>
        )}
      </View>
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
  commentContainer: { flex: 1 },
  commentTextInput: {
    height: '100%',
  },
  buttonContainer: {
    paddingVertical: 15,
  },
});
