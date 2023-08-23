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
          const isCommentsScreen = e.target?.startsWith(Comments.name);
          const actionType = (e.data as {action: {type: string}})?.action.type;
          if (
            isCommentsScreen &&
            (actionType === 'POP' || actionType === 'GO_BACK')
          ) {
            mainScreenMutable.removeDepth();
          }
        },
      }}>
      <Stack.Screen component={Thread} name={Thread.name} />
      <Stack.Screen component={Comments} name={Comments.name} />
    </Stack.Navigator>
  );
};
