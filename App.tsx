import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';
import {Splash} from './src/screens/Splash';
import {Home} from './src/screens/Home';

const Stack = createNativeStackNavigator();
const flex1 = {flex: 1};

export const App = () => {
  return (
    <SafeAreaView style={flex1}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Splash.name}>
          <Stack.Screen
            name={Splash.name}
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Home.name}
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
