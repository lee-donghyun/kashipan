import {IconOutline} from '@ant-design/icons-react-native';
import {animated, useSpring} from '@react-spring/native';
import {JSX} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';

import {useBrowser} from '../hooks/useBrowser';
import {Colors, Dimensions} from '../services/constant';

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
    backgroundColor: Colors.WHITE,
    height: Dimensions.HEIGHT - 60,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
});

export const BrowserProvider = ({children}: {children: JSX.Element}) => {
  const {getIsOpen, close, props} = useBrowser();
  const isOpen = getIsOpen();

  const backdrop = useSpring({
    opacity: isOpen ? 0.9 : 1,
    scale: isOpen ? 0.96 : 1,
    translateY: isOpen ? 20 : 0,
  });
  const modal = useSpring({
    translateY: isOpen ? 0 : Dimensions.HEIGHT + 60,
  });

  return (
    <View style={styles.background}>
      <animated.View
        style={[
          styles.backdrop,
          {
            ...backdrop,
            ...(isOpen && {borderRadius: 30, pointerEvents: 'none'}),
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
        <View style={styles.modalHeader}>
          <Pressable onPress={close}>
            <IconOutline name="close" size={24} />
          </Pressable>
        </View>
        {isOpen && <WebView {...props} />}
      </animated.View>
    </View>
  );
};
