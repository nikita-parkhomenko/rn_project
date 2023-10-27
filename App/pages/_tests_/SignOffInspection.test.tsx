import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import Routes from '../../routing/Routes';
import SignOffInspection from '../SignOffInspection';
import SignOffInspectionComment from '../SignOffInspectionComment';
import { MockedProvider } from '@apollo/client/testing';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('../../hooks/useAuth', () => {
  return jest.fn(() => ({
    loggedInUser: {
      fullName: 'Billy Bob',
    },
  }));
});

jest.mock('../../hooks/useSnackbar', () => {
  return jest.fn(() => ({
    showSnackbar: jest.fn(),
  }));
});

jest.mock('../../queries', () => ({
  useFailureRisksQuery: jest.fn(() => ({ data: null })),
  useSignOffInspectionMutation: jest.fn(() => [jest.fn()]),
}));

describe('SignOffInspection', () => {
  test('contains header and user name', async () => {
    const Stack = createStackNavigator();
    const component = (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={Routes.SignOffInspection} component={SignOffInspection} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const { getByText, getAllByText } = render(component);
    await act(async () => {});

    const header = getAllByText(/Sign off inspection/i);
    expect(header).not.toBeNull();
    expect(header).toHaveLength(2);

    const description = getByText(
      /By signing off this inspection you confirm that you have checked the door against the required fields and have permission to sign off/i
    );
    expect(description).not.toBeNull();

    const name = getByText(/Billy Bob/i);
    expect(name).not.toBeNull();
  });

  test('sign off inspection navigates to comment page', async () => {
    const Stack = createStackNavigator();
    const component = (
      <MockedProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={Routes.SignOffInspection} component={SignOffInspection} initialParams={{ doorId: 5 }} />
            <Stack.Screen name={Routes.SignOffInspectionComment} component={SignOffInspectionComment} />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );

    const { getByTestId, getAllByText } = render(component);
    await act(async () => {});

    const signOffButton = getByTestId('sign-off');
    expect(signOffButton).not.toBeNull();

    fireEvent.press(signOffButton);

    // have to getAllBy because getByText will throw an error if more than one
    // result is found. The way react-native-paper components are written mean
    // there may be duplicated Text elements.
    const commentBox = getAllByText(/Inspection comments/i);
    expect(commentBox).not.toBeNull();
  });

  test('fail inspection navigates to comment page', async () => {
    const Stack = createStackNavigator();
    const component = (
      <MockedProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={Routes.SignOffInspection} component={SignOffInspection} initialParams={{ doorId: 5 }} />
            <Stack.Screen name={Routes.SignOffInspectionComment} component={SignOffInspectionComment} />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );

    const { getByTestId, getAllByText } = render(component);
    await act(async () => {});

    const failButton = getByTestId('fail');
    expect(failButton).not.toBeNull();

    fireEvent.press(failButton);

    const header = getAllByText(/Fail inspection/i);
    expect(header).not.toBeNull();
  });
});
