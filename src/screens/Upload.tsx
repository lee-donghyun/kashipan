import {Alert, Pressable, StyleSheet, View} from 'react-native';
import {Colors} from '../services/constant';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useOnce} from '../hooks/useOnce';
import {useNavigation} from '@react-navigation/native';
import {useRef, useState} from 'react';
import {trigger as haptic} from 'react-native-haptic-feedback';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: 80,
  },
  camera: {
    aspectRatio: 1,
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    borderRadius: 9999,
    borderColor: 'black',
    borderWidth: 8,
    width: 80,
    height: 80,
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

const vibrate = () => haptic('impactMedium');

export const Upload = () => {
  const navigation = useNavigation();
  const {back: device} = useCameraDevices('wide-angle-camera');
  const cameraRef = useRef<Camera>(null);
  const [isRecording, setIsRecording] = useState(false);

  const takePicture = () => {
    vibrate();
    cameraRef.current?.takeSnapshot().then(file => console.log(file));
  };

  const takeVideo = () => {
    vibrate();
    cameraRef.current?.startRecording({
      onRecordingError: () => {},
      onRecordingFinished: console.log,
    });
  };

  useOnce(() => {
    assertCameraPermission().catch(message => {
      Alert.alert(message);
      navigation.goBack();
    });
  });

  if (device == null) {
    return <View style={styles.background} />;
  }
  return (
    <View style={styles.cameraContainer}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={true}
        photo
      />
      <View style={styles.actionsContainer}>
        <Pressable
          style={({pressed}) => [
            styles.actionButton,
            pressed && {opacity: 0.7},
          ]}
          onPress={takePicture}
          onLongPress={() => {
            setIsRecording(true);
            takeVideo();
          }}
          onPressOut={() => {
            if (isRecording) {
              setIsRecording(false);
              vibrate();
              cameraRef.current?.stopRecording();
            }
          }}
        />
      </View>
    </View>
  );
};
Upload.name = 'Upload';
