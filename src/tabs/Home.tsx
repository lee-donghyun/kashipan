import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Thread} from '../stacks/Thread';
import {Comments} from '../stacks/Comments';

const Stack = createNativeStackNavigator();

export const Home = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Thread.name} component={Thread} />
      <Stack.Screen name={Comments.name} component={Comments} />
    </Stack.Navigator>
  );
};
Home.name = 'Home';
