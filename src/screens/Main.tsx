import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Home} from '../tabs/Home';
import {MyPage} from '../tabs/MyPage';
import {Pressable, StyleSheet, View} from 'react-native';
import {IconOutline, IconFill} from '@ant-design/icons-react-native';

const Tab = createBottomTabNavigator();
const styles = StyleSheet.create({
  tabBarContainter: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingStart: 8,
    paddingEnd: 8,
  },
  tabBarItem: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 6,
    alignItems: 'center',
  },
  notSelected: {
    color: '#A1A1A1',
  },
});

const TabBar = ({navigation, state: {index}}: BottomTabBarProps) => {
  return (
    <View style={styles.tabBarContainter}>
      <Pressable
        style={styles.tabBarItem}
        onPress={() => {
          navigation.navigate(Home.name);
        }}>
        <IconOutline
          size={24}
          name="home"
          style={index !== 0 && styles.notSelected}
        />
      </Pressable>
      <Pressable style={styles.tabBarItem}>
        <IconFill
          size={24}
          name="up-circle"
          style={{transform: [{scale: 2}, {translateY: -2}]}}
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
