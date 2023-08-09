import {Alert, StyleSheet, View} from 'react-native';
import {Colors} from '../services/constant';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useOnce} from '../hooks/useOnce';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});

const assertCameraPermission = async () => {
  const cameraPermission = await Camera.getCameraPermissionStatus();
  if (!cameraPermission) {
    const newCameraPermission = await Camera.requestCameraPermission();
    if (newCameraPermission !== 'authorized') {
      throw new Error('카메라 권한을 허용해주세요.');
    }
  }
  const microphonePermission = await Camera.getMicrophonePermissionStatus();
  if (!microphonePermission) {
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
    if (newMicrophonePermission !== 'authorized') {
      throw new Error('마이크 권한을 허용해주세요.');
    }
  }
};

export const Upload = () => {
  const navigation = useNavigation();

  useOnce(() => {
    assertCameraPermission().catch(message => {
      Alert.alert(message);
      navigation.goBack();
    });
  });
  const {back: device, ...res} = useCameraDevices();
  console.log({device, res}, 'ㅠㅠㅠ');

  if (device == null) {
    return <View style={styles.background} />;
  }
  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
};
Upload.name = 'Upload';
