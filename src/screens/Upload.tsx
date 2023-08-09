import {
  Alert,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors} from '../services/constant';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useOnce} from '../hooks/useOnce';
import {useNavigation} from '@react-navigation/native';
import {useRef, useState} from 'react';
import {trigger as haptic} from 'react-native-haptic-feedback';
import {IconFill, IconOutline} from '@ant-design/icons-react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  camera: {
    aspectRatio: 1,
  },
  indicatorContainer: {
    padding: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
  },
  indicator: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    opacity: 0.8,
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
  },
  actionButton: {
    borderRadius: 9999,
    borderColor: Colors.BLACK,
    borderWidth: 8,
    width: 80,
    height: 80,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 80,
    flexDirection: 'row',
  },
  balancer: {width: 60},
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
  const [files, setFiles] = useState<{type: 'photo' | 'video'; path: string}[]>(
    [],
  );

  const takePicture = () => {
    vibrate();
    cameraRef.current
      ?.takePhoto()
      .then(file => setFiles(p => [...p, {type: 'photo', path: file.path}]));
  };

  const takeVideo = () => {
    vibrate();
    cameraRef.current?.startRecording({
      onRecordingError: () => {},
      onRecordingFinished: file =>
        setFiles(p => [...p, {type: 'video', path: file.path}]),
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
      <StatusBar hidden />
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <IconOutline name="left" size={20} />
        </Pressable>
      </View>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={true}
        photo
        video
      />
      <View style={styles.indicatorContainer}>
        <View style={styles.indicator}>
          <IconOutline name="camera" />
          <Text>{files.filter(file => file.type === 'photo').length}</Text>
        </View>
        <View style={styles.indicator}>
          <IconOutline name="video-camera" />
          <Text>{files.filter(file => file.type === 'video').length}</Text>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <View style={styles.balancer} />
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
        <Pressable style={({pressed}) => pressed && {opacity: 0.6}}>
          <IconFill name="right-circle" size={60} />
        </Pressable>
      </View>
    </View>
  );
};
Upload.name = 'Upload';
