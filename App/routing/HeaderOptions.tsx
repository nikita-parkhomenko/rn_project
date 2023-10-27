import { StackNavigationOptions } from '@react-navigation/stack';
import { headerColour } from '../constants/Style';

const DefaultHeaderOptions: StackNavigationOptions = {
  headerShown: true,
  title: '',
  headerTitleAlign: 'center',
  headerTransparent: false,
  headerTintColor: '#D9DFE6',
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: headerColour,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
};

export default DefaultHeaderOptions;
