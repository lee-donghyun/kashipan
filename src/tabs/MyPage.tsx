import {IconFill, IconOutline} from '@ant-design/icons-react-native';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {trigger as haptic} from 'react-native-haptic-feedback';

import {Spacer} from '../components/Spacer';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    padding: 16,
    flex: 1,
  },
  label: {
    opacity: 0.7,
    fontSize: 12,
    paddingTop: 20,
    paddingBottom: 6,
  },
  toggle: {
    fontSize: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  red: {
    color: 'red',
    opacity: 0.7,
  },
});

export const MyPage = () => {
  const onPress = () => {
    haptic('impactMedium');
  };
  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>@my_user_id</Text>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.label}>설정</Text>
        <Pressable onPress={onPress} style={styles.toggle}>
          <Text>댓글 푸시 알림</Text>
          <IconFill name="check-circle" size={24} />
        </Pressable>
        <Pressable onPress={onPress} style={styles.toggle}>
          <Text>좋아요 푸시 알림</Text>
          <IconOutline name="close-circle" size={24} />
        </Pressable>
        <Spacer h={40} />
        <Text style={styles.label}>계정</Text>
        <Pressable onPress={onPress} style={styles.toggle}>
          <Text style={styles.red}>로그아웃</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};
