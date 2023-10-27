import React from 'react';
import { NfcOptions } from '../providers/NfcProvider';

export interface NfcContextContent {
  scanNfc: (options: NfcOptions) => void;
  stopScan: () => void;
}

// @ts-ignore
export default React.createContext<NfcContextContent>();
