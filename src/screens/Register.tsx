import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {SafeAreaView} from '../components/SafeAreaView';
import {Colors, DOMAIN} from '../services/constant';
import {Main} from './Main';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 40,
  },
  logo: {
    fontSize: 30,
    paddingTop: 20,
    fontWeight: 'bold',
  },
  helper: {
    fontSize: 14,
    color: Colors.GRAY,
    paddingTop: 30,
    flex: 1,
  },
  kakaoLogin: {
    fontSize: 16,
    backgroundColor: '#FEE500',
    borderRadius: 10,
    padding: 18,
  },
});

export const Register = ({navigation}: NativeStackScreenProps<any>) => {
  return (
    <SafeAreaView>
      <View style={styles.background}>
        <Text style={styles.logo}>{DOMAIN}</Text>
        <Text style={styles.helper}>로그인하여 {DOMAIN}을 사용하세요.</Text>
        <View>
          <Pressable
            onPress={() => {
              navigation.replace(Main.name);
            }}
            style={({pressed}) => [
              pressed && {
                opacity: 0.8,
              },
              styles.kakaoLogin,
            ]}>
            <Text>카카오로 로그인</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
