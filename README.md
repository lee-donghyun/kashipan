# Kashipan

React native로 만든 SNS 앱입니다.

## 기능

직접 찍은 사진과 동영상, 텍스트 공유기능을 제공합니다.
푸시알림으로 알림을 전송합니다.

## 시작하는 방법

이 프로젝트는 npm@9 을 사용합니다.

### ios

```sh
$ npm i
$ npx pod-install
$ npx react-native-asset # 이 과정에서 나오는  react-native-haptic-feedback/ios/RNHapticFeedback.xcassets 관련 에러메시지는 무시해도 됩니다.
$ npm run start
```

### android

죄송합니다.

## 의존성

- react
- react-native
- react-native-haptic-feedback
- react-native-video
- react-native-vision-camera
- swr
- zustand
- typescript
