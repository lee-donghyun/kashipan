import {KAKAO_API_URL, KAKAO_AUTH_URL, REDIRECT_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {parse, stringify} from 'qs';
import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import useSWRMutation from 'swr/mutation';

import {SafeAreaView} from '../components/SafeAreaView';
import {useBrowser} from '../hooks/useBrowser';
import {api} from '../services/api';
import {Colors, DOMAIN} from '../services/constant';
import {authStorage} from '../services/storage';
import {Splash} from './Splash';

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

export const Register = () => {
  const navigation = useNavigation<any>();
  const openBroswer = useBrowser(store => store.open);
  const closeBrowser = useBrowser(store => store.close);
  const [error, setError] = useState('');

  const {trigger, isMutating} = useSWRMutation(
    'REGISTER',
    async (key: string, {arg: {code}}: {arg: {code: string}}) => {
      const token = await signUpWithKakaoCode(code);
      await authStorage.saveToken(token);
      navigation.replace(Splash.name);
    },
    {
      onError: e => {
        console.log(e);
        setError(JSON.stringify(e));
      },
    },
  );

  return (
    <SafeAreaView>
      <View style={styles.background}>
        <Text style={styles.logo}>{DOMAIN}</Text>
        <Text style={styles.helper}>로그인하여 {DOMAIN}을 사용하세요.</Text>
        {error && <Text style={styles.helper}>{error}</Text>}
        <View>
          <Pressable
            onPress={() => {
              openBroswer({
                source: {
                  uri: `${KAKAO_AUTH_URL}/oauth/authorize?client_id=505dad63d4a0f354aa3fc1b9558c2b7d&redirect_uri=https%3A%2F%2Fkashipan.react-native.app%2Ftoken&response_type=code`,
                },
                onNavigationStateChange: e => {
                  const {url} = e;
                  const code = parse(url.split('?')[1]).code;
                  if (
                    url.startsWith(REDIRECT_URL) &&
                    typeof code === 'string'
                  ) {
                    closeBrowser();
                    trigger({code});
                  }
                },
              });
            }}
            style={({pressed}) => [
              pressed && {
                opacity: 0.8,
              },
              styles.kakaoLogin,
              isMutating && {
                backgroundColor: Colors.GRAY,
              },
            ]}>
            <Text>카카오로 로그인</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const signUpWithKakaoCode = async (code: string) => {
  const {
    data: {access_token: accessToken},
  } = await axios.post(
    `${KAKAO_AUTH_URL}/oauth/token`,
    stringify({
      grant_type: 'authorization_code',
      client_id: '505dad63d4a0f354aa3fc1b9558c2b7d',
      redirect_uri: 'https://kashipan.react-native.app/token',
      code,
      client_secret: '4UONe0oOKP140BuchuGhqEaXQqMffwKW',
    }),
  );

  const {
    data: {id},
  } = await axios.get(`${KAKAO_API_URL}/v2/user/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  const email = `${id}@kauth.kakao.com`;

  await api.post('/user/signUp', {email}).catch(() => {});
  const {
    data: {token},
  } = await api.post('/user/signIn', {email});

  return token;
};
