import React from 'react';

export interface SnackbarContextContent {
  showSnackbar: (message: string) => void;
}

// @ts-ignore
export default React.createContext<SnackbarContextContent>();
