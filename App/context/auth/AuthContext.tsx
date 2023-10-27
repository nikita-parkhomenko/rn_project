import React, { useReducer, createContext } from 'react';
import { SET_LOGGED_IN_USER } from './Actions';
import Action from '../Action';

interface Role {
  code: string;
  name: string;
}

interface LoggedInUser {
  id: string;
  fullName: string;
  companyId?: string;
  companyName?: string;
  roles: Role[];
  jwtHeader: string;
  email: string;
}

interface AuthState {
  loggedIn?: boolean;
  loggedInUser?: LoggedInUser;
}

export interface AuthContextContent {
  state: AuthState;
  setLoggedInUser: (user: LoggedInUser | undefined) => void;
}

const AuthContext = createContext<AuthContextContent>({} as AuthContextContent);

function reducerWrapper(state: AuthState, action: Action) {
  const newState = reducer(state, action);
  return newState;
}
function reducer(state: AuthState, action: Action) {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return { ...state, loggedInUser: action.payload, loggedIn: action.payload !== undefined };
    default:
      return state;
  }
}

const initialState: AuthState = {
  loggedIn: undefined,
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [state, dispatch] = useReducer(reducerWrapper, initialState);

  const value: AuthContextContent = {
    state,
    setLoggedInUser: (user: LoggedInUser | undefined) => {
      dispatch({ type: SET_LOGGED_IN_USER, payload: user });
    },
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

export default AuthContext;
