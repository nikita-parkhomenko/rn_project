import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import SignOff from '../components/door/common/SignOff';
import { InspectionStackParamList } from '../routing/InspectionsStackScreen';
import Routes from '../routing/Routes';

type SignOffInspectionProps = StackScreenProps<InspectionStackParamList, Routes.SignOffInspection>;

export default function SignOffInspection({ route, navigation }: SignOffInspectionProps) {
  const onButtonPress = (isSuccess: boolean) => {
    navigation.navigate(Routes.SignOffInspectionComment, { doorId: route.params.doorId, isSuccess });
  };

  return <SignOff type="inspection" onPress={onButtonPress} />;
}
