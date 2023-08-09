import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Thread} from '../stacks/Thread';
import {Comments} from '../stacks/Comments';
import {mainScreenMutable} from '../services/mutables';

const Stack = createNativeStackNavigator();

export const Home = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      screenListeners={{
        beforeRemove: e => {
          // Thread 탭인지 확인 추가 필요
          if ((e.data as {action: {type: string}})?.action.type === 'POP') {
            mainScreenMutable.removeDepth();
          }
        },
      }}>
      <Stack.Screen name={Thread.name} component={Thread} />
      <Stack.Screen name={Comments.name} component={Comments} />
    </Stack.Navigator>
  );
};
