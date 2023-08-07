import {StyleProp, Text, TextStyle, View, ViewStyle} from 'react-native';
import {useOnce} from '../hooks/useOnce';
import {User, useUser} from '../hooks/useUser';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Home} from './Home';

class Styles {
  static logo: StyleProp<TextStyle> = {
    fontStyle: 'italic',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  };
  static container: StyleProp<ViewStyle> = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  };
}

const prefetch = (): Promise<User> =>
  new Promise((res, rej) => {
    setTimeout(() => {
      rej();
    }, 2000);
  });

export const Splash = ({navigation}: NativeStackScreenProps<any>) => {
  const setUser = useUser(store => store.setUser);

  useOnce(() => {
    prefetch()
      .then(user => {
        setUser(user);
        navigation.replace(Home.name);
      })
      .catch(() => {
        navigation.replace(Home.name);
      });
  });

  return (
    <View style={Styles.container}>
      <Text style={Styles.logo}>KASHIPAN</Text>
    </View>
  );
};
Splash.name = 'Splash';
