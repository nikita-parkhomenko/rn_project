import * as React from 'react';
import { useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Background from '../components/Background';
import BackgroundGlitchFix from '../components/BackgroundGlitchFix';
import Button from '../components/Button';
import PasswordInput from '../components/PasswordInput';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const passwordRef = useRef<any>(null);
  const { login } = useAuth();

  const onLogin = () => {
    if (username.length !== 0 && password.length !== 0) {
      setLoading(true);
      login(username, password)
        .then((_loginResponse) => {
          setLoading(false);
          setError(false);
          // When logging in the RootStackScreen will only render "protected" pages. We do not need to redirect here
        })
        .catch((_e) => {
          setLoading(false);
          setError(true);
        });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <Background>
          <BackgroundGlitchFix />
          <View style={styles.container}>
            <TextInput
              style={styles.item}
              label="Email"
              mode="outlined"
              value={username}
              onChangeText={(text) => setUsername(text)}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <PasswordInput
              style={styles.item}
              label="Password"
              mode="outlined"
              value={password}
              onChangeText={(text: string) => setPassword(text)}
              ref={(ref: any) => (passwordRef.current = ref)}
              onSubmitEditing={onLogin}
              returnKeyType="go"
            />
            <Button
              style={[styles.item]}
              mode="contained"
              onPress={onLogin}
              disabled={username.length === 0 || password.length === 0 || loading}
              loading={loading}
            >
              Log in
            </Button>
            {error && (
              <View style={[styles.error]}>
                <Text style={[styles.errorText]}>Sorry, we don't recognise that email or password.</Text>
              </View>
            )}
          </View>
        </Background>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },

  error: {
    width: '100%',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#ff556c',
    borderRadius: 5,
    marginTop: 20,
  },
  errorText: {
    color: '#fff',
  },

  item: {
    marginBottom: 20,
  },
});
