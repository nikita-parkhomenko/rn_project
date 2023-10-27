import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function BottomSheetHeader({ children, containerStyle }: any) {
  return (
    <View>
      <View style={[styles.header, containerStyle]}>
        <View style={styles.handle}></View>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 20,
    borderWidth: 0,
  },
  handle: {
    backgroundColor: 'rgba(193, 215, 242, 0.5)',
    flex: 1,
    height: 5,
    marginTop: 5,
    width: 50,
    borderRadius: 3.5,
  },
});
