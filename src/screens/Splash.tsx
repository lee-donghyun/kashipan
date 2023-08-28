import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';

import {useOnce} from '../hooks/useOnce';
import {User, useUser} from '../hooks/useUser';
import {api} from '../services/api';
import {Colors, DOMAIN} from '../services/constant';
import {authStorage} from '../services/storage';
import {Main} from './Main';
import {Register} from './Register';

const styles = StyleSheet.create({
  logo: {
    fontStyle: 'italic',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
});

const prefetch = async (): Promise<{user: User}> => {
  const loginToken = await authStorage.getToken();
  const {data: user} = await api.get<User>('/user', {headers: {loginToken}});
  api.defaults.headers.loginToken = loginToken;
  return {user};
};

export const Splash = ({navigation}: NativeStackScreenProps<any>) => {
  const setUser = useUser(store => store.setUser);

  useOnce(() => {
    prefetch()
      .then(({user}) => {
        setUser(user);
        navigation.replace(Main.name);
      })
      .catch(() => {
        navigation.replace(Register.name);
      });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{DOMAIN}</Text>
    </View>
  );
};
