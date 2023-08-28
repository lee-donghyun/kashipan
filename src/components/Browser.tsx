import {useSpring} from '@react-spring/native';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

import {Animated} from './Animated';

const styles = StyleSheet.create({
  container: {},
});

export const Browser = () => {
  const container = useSpring({
    from: {
      transform: [{translateY: 1}],
    },
    to: {
      transform: [{translateY: 0}],
    },
  });
  return (
    <Animated style={container as {}}>
      <WebView />
    </Animated>
  );
};
