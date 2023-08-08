import {ScrollView, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 40,
  },
});

export const MyPage = () => {
  return (
    <ScrollView style={styles.background}>
      <Text>MyPage</Text>
    </ScrollView>
  );
};
MyPage.name = 'MyPage';
