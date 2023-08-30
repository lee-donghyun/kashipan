import {StyleSheet, Text, View} from 'react-native';

import {Comment} from '../data-types/comment';

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

export const CommentItem = ({item}: {item: Comment}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.user}>@{item.userId}</Text>
      <Text style={styles.content}>{item.comment}</Text>
    </View>
  );
};
