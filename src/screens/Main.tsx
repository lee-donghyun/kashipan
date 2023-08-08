import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Home} from '../tabs/Home';
import {MyPage} from '../tabs/MyPage';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const Tab = createBottomTabNavigator();
const styles = StyleSheet.create({
  tabBarContainter: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});

const TabBar = ({navigation}: BottomTabBarProps) => {
  return (
    <View style={styles.tabBarContainter}>
      <Pressable
        onPress={() => {
          navigation.navigate(Home.name);
        }}>
        <Text>Home</Text>
      </Pressable>
      <Pressable onPress={() => {}}>
        <Text>Upload</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate(MyPage.name);
        }}>
        <Text>MyPage</Text>
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
