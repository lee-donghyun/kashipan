import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TakeFiles} from '../stacks/TakeFiles';
import {TakePost} from '../stacks/TakePost';

const Stack = createNativeStackNavigator();
export const Upload = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={TakeFiles} name={TakeFiles.name} />
      <Stack.Screen component={TakePost} name={TakePost.name} />
    </Stack.Navigator>
  );
};
