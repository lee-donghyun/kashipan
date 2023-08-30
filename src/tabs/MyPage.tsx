import {useNavigation} from '@react-navigation/native';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {trigger as haptic} from 'react-native-haptic-feedback';

import {useUser} from '../hooks/useUser';
import {Splash} from '../screens/Splash';
import {authStorage} from '../services/storage';

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
  const navigation = useNavigation<any>();
  const {resetUser, user} = useUser();
  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>@{user?.email.split('@')[0]}</Text>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.label}>계정</Text>
        <Pressable
          style={styles.toggle}
          onPress={() => {
            haptic('impactMedium');
            resetUser();
            authStorage.removeToken();
            navigation.replace(Splash.name);
          }}>
          <Text style={styles.red}>로그아웃</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};
