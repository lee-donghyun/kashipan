import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView, StatusBar} from 'react-native';
import {Splash} from './src/screens/Splash';
import {Main} from './src/screens/Main';
import {Register} from './src/screens/Register';
import {SWRConfig} from 'swr';
import {Upload} from './src/screens/Upload';
import {Colors} from './src/services/constant';

const Stack = createNativeStackNavigator();
const appStyle = {flex: 1, backgroundColor: Colors.WHITE};

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
      <SafeAreaView style={appStyle}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={Splash.name}
            screenOptions={{headerShown: false}}>
            <Stack.Screen name={Splash.name} component={Splash} />
            <Stack.Screen name={Register.name} component={Register} />
            <Stack.Screen name={Main.name} component={Main} />
            <Stack.Screen name={Upload.name} component={Upload} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SWRConfig>
  );
};
