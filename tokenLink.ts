import { ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-community/async-storage';
import StorageKeys from './App/constants/StorageKeys';

//once the withToken link has the token, we can use it to send it to the server
const tokenLink = new ApolloLink((operation, forward) => {
  const { token } = operation.getContext();

  // add the authorization to the headers
  operation.setContext({
    headers: {
      jwt: token,
    },
  });

  return forward(operation);
});

//the code below does nothing on the send up to the server, but kicks in through the map when the response comes back
//if a set-cookie is sent back from the server (indicating a new token), then we will save the token into AsyncStorage so
//that the request pipeline can send it back up with each request (see the withToken / tokenLink functions)
export const refreshResponse = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();

    const {
      response: { headers },
    } = context;

    if (headers) {
      const setCookie = headers.get('set-cookie');
      let token = undefined;
      if (setCookie) {
        const indexOfToken = setCookie.indexOf('token=', 0);
        const semicolonAfterToken = setCookie.indexOf(';', indexOfToken);
        token = setCookie.substring(indexOfToken + 6, semicolonAfterToken);
        AsyncStorage.setItem(StorageKeys.Token, token);
      }
    }
    return response;
  });
});

//the withToken link will run first and get the token out of storage
export const withToken = setContext(async () => {
  const token = await AsyncStorage.getItem(StorageKeys.Token);
  return { token };
});

export default tokenLink;
