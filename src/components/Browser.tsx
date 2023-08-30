import {animated, useSpring} from '@react-spring/native';
import {JSX} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import {useBrowser} from '../hooks/useBrowser';
import {Colors} from '../services/constant';

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.BLACK,
    flex: 1,
  },
  backdrop: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    overflow: 'hidden',
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: Colors.GRAY,
    height: Dimensions.get('window').height - 60,
  },
});

export const BrowserProvider = ({children}: {children: JSX.Element}) => {
  const open = useBrowser(store => store.open);
  const backdrop = useSpring({
    scale: open ? 0.96 : 1,
    translateY: open ? 20 : 0,
  });
  const modal = useSpring({
    translateY: open ? 0 : 890,
  });

  return (
    <View style={styles.background}>
      <animated.View
        style={[
          styles.backdrop,
          {
            ...backdrop,
            ...(open && {borderRadius: 30, pointerEvents: 'none'}),
            transform: [
              {scale: backdrop.scale},
              {translateY: backdrop.translateY},
            ],
          },
        ]}>
        {children}
      </animated.View>
      <animated.View
        style={[
          styles.modal,
          {
            ...modal,
            transform: [{translateY: modal.translateY}],
          },
        ]}>
        <Text>여기에.. 웹뷰?</Text>
      </animated.View>
    </View>
  );
};
