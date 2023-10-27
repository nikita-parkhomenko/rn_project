import { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext';
import { apiUrl, mobileClientType } from '../services/EnvironmentService';
import axios, { AxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import StorageKeys from '../constants/StorageKeys';

let CookieManager: any = undefined;
try {
  if (Constants.appOwnership !== 'expo') {
    import('@react-native-community/cookies').then((cookieManager) => (CookieManager = cookieManager.default));
  }
} catch {}

export default function useAuth() {
  const authContext = useContext(AuthContext);
  const loggedInUser = authContext.state.loggedInUser;
  const hasRole = (roleCode: string): boolean => {
    return !!authContext.state.loggedInUser?.roles.map((r) => r.code).includes(roleCode);
  };

  const hasAnyRole = (roleCodes?: string[]): boolean => {
    if (!roleCodes) {
      return true;
    }
    const someRolesMatch = authContext.state.loggedInUser?.roles
      .map((r) => r.code)
      .some((roleCode) => roleCodes?.includes(roleCode));

    return !!someRolesMatch;
  };

  const logout = async (): Promise<void> => {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'x-client-type': mobileClientType,
      },
      withCredentials: true,
    };
    if (CookieManager) {
      // Removing the cookie will ensure the client logs out even if the requet to the server fails.
      await CookieManager.clearAll();
    }
    authContext.setLoggedInUser(undefined);

    AsyncStorage.removeItem(StorageKeys.Token);

    return axios.post(`${apiUrl}/logout`, undefined, config);
  };

  const login = (email: string, password: string): Promise<any> => {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'x-client-type': mobileClientType,
      },
      withCredentials: true,
    };

    const promise = axios.post(`${apiUrl}/login`, { email, password }, config);

    promise
      .then((loginResponse) => {
        setLoggedInUser({
          id: loginResponse.data.id,
          fullName: loginResponse.data.fullName,
          companyId: loginResponse.data.companyId,
          companyName: loginResponse.data.companyName,
          roles: loginResponse.data.roles,
          jwtHeader: loginResponse.data.jwtHeader,
          email,
        });
        AsyncStorage.setItem(StorageKeys.Token, JSON.stringify(loginResponse.data.jwtHeader));
      })
      .catch(() => {
        setLoggedInUser(undefined);
      });

    return promise;
  };

  const isLoggedIn = authContext.state.loggedIn;
  const setLoggedInUser = authContext.setLoggedInUser;

  /* After a lot of fighting we could not get the setLoggedInUser internal to the hook 
  because the logic in the splash screen does not seem to want to work within the hook. 
  The call to get the user logged in status seems to be made, but there is never any data or errors coming back.
   */
  return { hasRole, hasAnyRole, isLoggedIn, loggedInUser, login, logout, setLoggedInUser };
}
