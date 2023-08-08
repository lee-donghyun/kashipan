import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Home} from '../tabs/Home';
import {MyPage} from '../tabs/MyPage';
import {Pressable, StyleSheet, View} from 'react-native';
import {IconOutline, IconFill} from '@ant-design/icons-react-native';
import {Colors} from '../services/constant';
import {mainScreenMutable} from '../services/mutables';

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
          size={24}
          name="home"
          style={index !== 0 && styles.notSelected}
        />
      </Pressable>
      <Pressable>
        <IconFill
          size={24}
          name="up-circle"
          style={{transform: [{scale: 2.4}, {translateY: -1}]}}
        />
      </Pressable>
      <Pressable
        style={styles.tabBarItem}
        onPress={() => {
          navigation.navigate(MyPage.name);
        }}>
        <IconOutline
          size={24}
          name="user"
          style={index !== 1 && styles.notSelected}
        />
      </Pressable>
    </View>
  );
};

export const Main = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} tabBar={TabBar}>
      <Tab.Screen name={Home.name} component={Home} />
      <Tab.Screen name={MyPage.name} component={MyPage} />
    </Tab.Navigator>
  );
};
Main.name = 'Main';
