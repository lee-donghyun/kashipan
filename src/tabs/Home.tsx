import {ScrollView, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export const Home = () => {
  return (
    <ScrollView style={styles.background}>
      <Text>Home</Text>
    </ScrollView>
  );
};
Home.name = 'Home';
