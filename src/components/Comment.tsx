import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  user: {
    fontWeight: '500',
    fontSize: 14,
  },
  content: {
    paddingTop: 3,
    fontSize: 14,
    opacity: 0.8,
  },
});
export const Comment = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.user}>@유저이름1</Text>
      <Text style={styles.content}>
        You can get reference the ScrollView component by setting ref property
        and using this.refs as described here
      </Text>
    </View>
  );
};
