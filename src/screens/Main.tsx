import {IconFill, IconOutline} from '@ant-design/icons-react-native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Pressable, StyleSheet, View} from 'react-native';
import {trigger as haptic} from 'react-native-haptic-feedback';

import {SafeAreaView} from '../components/SafeAreaView';
import {useUploadPost} from '../hooks/useUploadPost';
import {Colors} from '../services/constant';
import {mainScreenMutable} from '../services/mutables';
import {Home} from '../tabs/Home';
import {MyPage} from '../tabs/MyPage';
import {Upload} from './Upload';

const Tab = createBottomTabNavigator();
const styles = StyleSheet.create({
  tabBarContainter: {
    backgroundColor: Colors.WHITE,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  tabBarItem: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 6,
    alignItems: 'center',
  },
  notSelected: {
    color: Colors.GRAY,
  },
});

const TabBar = ({navigation, state: {index}}: BottomTabBarProps) => {
  const resetPost = useUploadPost(state => state.reset);
  return (
    <View style={styles.tabBarContainter}>
      <Pressable
        style={styles.tabBarItem}
        onPress={() => {
          if (index === 0) {
            if (mainScreenMutable.getDepth() > 0) {
              mainScreenMutable.removeDepth();
              navigation.goBack();
              return;
            }
            mainScreenMutable.scrollToTop();
            return;
          }
          navigation.navigate(Home.name);
        }}>
        <IconOutline
          name="home"
          size={24}
          style={index !== 0 && styles.notSelected}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate(Upload.name);
          haptic('impactMedium');
          resetPost();
        }}>
        <IconFill
          name="up-circle"
          size={24}
          style={{transform: [{scale: 2.4}, {translateY: -1}]}}
        />
      </Pressable>
      <Pressable
        style={styles.tabBarItem}
        onPress={() => {
          navigation.navigate(MyPage.name);
        }}>
        <IconOutline
          name="user"
          size={24}
          style={index !== 1 && styles.notSelected}
        />
      </Pressable>
    </View>
  );
};

const TabBarComponent = (props: BottomTabBarProps) => <TabBar {...props} />;

export const Main = () => {
  return (
    <SafeAreaView>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        tabBar={TabBarComponent}>
        <Tab.Screen component={Home} name={Home.name} />
        <Tab.Screen component={MyPage} name={MyPage.name} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
