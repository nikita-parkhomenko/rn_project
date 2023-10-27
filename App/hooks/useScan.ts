import { useContext } from 'react';
import NfcContext, { NfcContextContent } from '../context/NfcContext';

export default (): NfcContextContent => useContext(NfcContext);
