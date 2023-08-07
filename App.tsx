import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';
import {Splash} from './src/screens/Splash';
import {Home} from './src/screens/Home';
import {Register} from './src/screens/Register';

const Stack = createNativeStackNavigator();
const appStyle = {flex: 1};

export const App = () => {
  return (
    <SafeAreaView style={appStyle}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Splash.name}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={Splash.name} component={Splash} />
          <Stack.Screen name={Register.name} component={Register} />
          <Stack.Screen name={Home.name} component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
