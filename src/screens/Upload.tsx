import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TakeFiles} from '../stacks/TakeFiles';
import {TakePost} from '../stacks/TakePost';

const Stack = createNativeStackNavigator();
export const Upload = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={TakeFiles.name} component={TakeFiles} />
      <Stack.Screen name={TakePost.name} component={TakePost} />
    </Stack.Navigator>
  );
};
