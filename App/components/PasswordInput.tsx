import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const PasswordInput = React.forwardRef((props: any, ref: any) => {
  const [icEye, setIcEye] = useState('visibility');
  const [isPassword, setIsPassword] = useState(true);

  const changePwdType = () => {
    if (isPassword) {
      setIsPassword(false);
      setIcEye('visibility-off');
    } else {
      setIsPassword(true);
      setIcEye('visibility');
    }
  };

  return (
    <View>
      <TextInput {...props} secureTextEntry={isPassword} ref={ref} />
      <MaterialIcons style={styles.icon} name={icEye} size={30} color={'#fff'} onPress={changePwdType} />
    </View>
  );
});

export default PasswordInput;

const styles = StyleSheet.create({
  icon: { position: 'absolute', top: 10, right: 5, padding: 9, zIndex: 10000 },
});
