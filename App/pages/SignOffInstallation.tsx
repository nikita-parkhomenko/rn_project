import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import SignOff from '../components/door/common/SignOff';
import { InstallationStackParamList } from '../routing/InstallationsStackScreen';
import Routes from '../routing/Routes';

type SignOffInstallationProps = StackScreenProps<InstallationStackParamList, Routes.SignOffInstallation>;

export default function SignOffInstallation({ route, navigation }: SignOffInstallationProps) {
  const onButtonPress = (isSuccess: boolean) => {
    navigation.navigate(Routes.SignOffInstallationComment, { doorId: route.params.doorId, isSuccess });
  };

  return <SignOff type="installation" onPress={onButtonPress} />;
}
