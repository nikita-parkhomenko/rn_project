import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import useSnackbar from '../hooks/useSnackbar';
import { useSignOffInstallationMutation } from '../queries';
import { InstallationStackParamList } from '../routing/InstallationsStackScreen';
import Routes from '../routing/Routes';
import SignOffComment from '../components/door/common/SignOffComment';

type SignOffInstallationCommentProps = StackScreenProps<InstallationStackParamList, Routes.SignOffInstallationComment>;

export default function SignOffInstallationComment({ navigation, route }: SignOffInstallationCommentProps) {
  const [signOffInstallationMutation] = useSignOffInstallationMutation();
  const { showSnackbar } = useSnackbar();
  const { isSuccess, doorId } = route.params;
  const pageTitle = isSuccess ? 'Sign off installation' : 'Fail installation';
  const commentLabel = isSuccess ? 'Comment' : 'Failure reason';
  const snackbarSuccessMessage = isSuccess ? 'Installation signed off' : 'Installation failed';

  const onSubmit = async (message: string) => {
    try {
      await signOffInstallationMutation({
        variables: {
          doorId: String(doorId),
          isSuccess: isSuccess,
          message,
        },
      });
      showSnackbar(snackbarSuccessMessage);
      navigation.navigate(Routes.InstallerDoors);
    } catch (e) {
      console.log(e);
      showSnackbar('There was an error submitting this operation');
    }
  };

  return <SignOffComment onSubmit={onSubmit} pageTitle={pageTitle} commentLabel={commentLabel} />;
}
