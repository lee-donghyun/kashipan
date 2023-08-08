import {StyleSheet, Text, View} from 'react-native';
import {useOnce} from '../hooks/useOnce';
import {User, useUser} from '../hooks/useUser';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Main} from './Main';
import {Register} from './Register';
import {Colors, DOMAIN} from '../services/constant';

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

const prefetch = (): Promise<{user: User}> =>
  new Promise((res, rej) => {
    setTimeout(() => {
      rej();
    }, 2000);
  });

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
Splash.name = 'Splash';
