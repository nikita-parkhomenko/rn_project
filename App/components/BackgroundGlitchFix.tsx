import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { backgroundColor } from '../constants/Style';

/* This component is a bit annoying but it helps with a small visual glitch visible in Android
 that shows a line underneath the top menu while the navigation transition shows.
 It has to be added to every page where the glitch is visible
 */
export default function BackgroundGlitchFix() {
  return <View style={styles.filler}></View>;
}

const styles = StyleSheet.create({
  filler: {
    backgroundColor: backgroundColor,
    width: '100%',
    height: 2,
    position: 'absolute',
    top: -1,
  },
});
