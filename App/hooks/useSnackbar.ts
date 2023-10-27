import SnackbarContext, { SnackbarContextContent } from '../context/SnackbarContext';
import { useContext } from 'react';

export default (): SnackbarContextContent => useContext(SnackbarContext);
