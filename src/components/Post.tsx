import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../services/constant';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  placeholder: {
    backgroundColor: Colors.GRAY,
    width: '100%',
    aspectRatio: 1,
    opacity: 0.2,
  },
  titleContainer: {
    padding: 12,
  },
  title: {
    fontWeight: '600',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 56,
  },
  content: {
    opacity: 0.9,
  },
});

export const Post = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>여기에 제목 들어갑니다</Text>
      </View>
      <View style={styles.placeholder} />
      <View style={styles.contentContainer}>
        <Text style={styles.content}>여기에는 내용들어갑니다 빼이~ </Text>
      </View>
    </View>
  );
};
