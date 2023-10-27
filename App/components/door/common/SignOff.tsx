import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PageTitle from '../../../components/PageTitle';
import { backgroundColor } from '../../../constants/Style';
import Button from '../../../components/Button';
import BackgroundGlitchFix from '../../../components/BackgroundGlitchFix';
import { Caption } from 'react-native-paper';
import useAuth from '../../../hooks/useAuth';

interface SignOffProps {
  onPress: (isSuccess: boolean) => void;
  type: 'installation' | 'inspection';
}

export default function SignOff({ onPress, type }: SignOffProps) {
  const { loggedInUser } = useAuth();

  const onButtonPress = (isSuccess: boolean) => {
    onPress(isSuccess);
  };

  return (
    <View style={styles.container}>
      <BackgroundGlitchFix />
      <PageTitle title={`Sign off ${type}`} />
      <View style={styles.body}>
        <Caption>
          {`By signing off this ${type} you confirm that you have checked the door against the required fields and have permission to sign off`}
        </Caption>
        <Text style={styles.signature}>{loggedInUser?.fullName}</Text>
        <View style={styles.buttonContainer}>
          <Button onPress={() => onButtonPress(true)} testID="sign-off">
            Sign off {type}
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button color={'#FF6860'} labelStyle={{ color: 'white' }} onPress={() => onButtonPress(false)} testID="fail">
            Fail {type}
          </Button>
        </View>
      </View>
    </View>
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
  buttonContainer: {
    paddingTop: 15,
    paddingBottom: 0,
  },
  signature: {
    fontFamily: 'Caveat-Regular',
    fontSize: 40,
    color: '#ffffff',
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
  },
});
