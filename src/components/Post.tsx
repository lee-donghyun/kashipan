import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../services/constant';
import {IconOutline} from '@ant-design/icons-react-native';

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
  },
  content: {
    opacity: 0.9,
  },
  actionContainer: {
    padding: 16,
    paddingBottom: 56,
    flexDirection: 'row',
    gap: 20,
  },
  action: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    opacity: 0.8,
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
      <View style={styles.actionContainer}>
        <Pressable style={styles.action}>
          <IconOutline size={20} name="heart" />
          <Text>102</Text>
        </Pressable>
        <Pressable style={styles.action}>
          <IconOutline size={20} name="message" />
          <Text>56</Text>
        </Pressable>
      </View>
    </View>
  );
};
