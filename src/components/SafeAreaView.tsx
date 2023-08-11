import {SafeAreaView as RNSafeAreaView, StatusBar} from 'react-native';
import {Colors} from '../services/constant';

const appStyle = {flex: 1, backgroundColor: Colors.WHITE};

export const SafeAreaView = ({
  children,
  hideStatusBar,
}: {
  children: JSX.Element;
  hideStatusBar?: true;
}) => {
  return (
    <RNSafeAreaView style={appStyle}>
      <StatusBar hidden={hideStatusBar} barStyle="dark-content" />
      {children}
    </RNSafeAreaView>
  );
};
