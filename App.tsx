import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Splash} from './src/screens/Splash';
import {Main} from './src/screens/Main';
import {Register} from './src/screens/Register';
import {SWRConfig} from 'swr';
import {Upload} from './src/screens/Upload';

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <SWRConfig
      value={{
        fetcher: () =>
          new Promise(res => {
            setTimeout(() => {
              res('');
            }, 2000);
          }),
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Splash.name}
          screenOptions={{headerShown: false}}>
          <Stack.Screen component={Splash} name={Splash.name} />
          <Stack.Screen component={Register} name={Register.name} />
          <Stack.Screen component={Main} name={Main.name} />
          <Stack.Screen component={Upload} name={Upload.name} />
        </Stack.Navigator>
      </NavigationContainer>
    </SWRConfig>
  );
};
