import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {mainScreenMutable} from '../services/mutables';
import {Comments} from '../stacks/Comments';
import {Thread} from '../stacks/Thread';

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
      <Stack.Screen component={Thread} name={Thread.name} />
      <Stack.Screen component={Comments} name={Comments.name} />
    </Stack.Navigator>
  );
};
