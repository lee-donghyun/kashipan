import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SWRConfig} from 'swr';

import {BrowserProvider} from './src/components/Browser';
import {Main} from './src/screens/Main';
import {Register} from './src/screens/Register';
import {Splash} from './src/screens/Splash';
import {Upload} from './src/screens/Upload';
import {api} from './src/services/api';

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <SWRConfig
      value={{
        fetcher: ([path, params]: [string, object]) =>
          api.get(path, {params}).then(res => res.data),
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}>
      <BrowserProvider>
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
      </BrowserProvider>
    </SWRConfig>
  );
};
