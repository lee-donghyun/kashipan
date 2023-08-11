import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../services/constant';
import {IconFill, IconOutline} from '@ant-design/icons-react-native';
import {useState} from 'react';
import {trigger as haptic} from 'react-native-haptic-feedback';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    backgroundColor: Colors.GRAY,
    flexBasis: '50%',
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
  bottomContainer: {
    padding: 16,
    paddingBottom: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  author: {
    opacity: 0.8,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
  },
  action: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    opacity: 0.8,
  },
});

export const Post = ({onPressComments}: {onPressComments: () => void}) => {
  const [liked, setLiked] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>여기에 제목 들어갑니다</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>여기에는 내용들어갑니다 빼이~ </Text>
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.image} />
        <View style={styles.image} />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.author}>@작성자아이디</Text>
        <View style={styles.actionContainer}>
          <Pressable
            style={styles.action}
            onPress={() => {
              haptic('impactMedium');
              setLiked(!liked);
            }}>
            {liked ? (
              <IconFill color="red" name="heart" size={20} />
            ) : (
              <IconOutline name="heart" size={20} />
            )}
            <Text>{liked ? '102' : '101'}</Text>
          </Pressable>
          <Pressable onPress={onPressComments} style={styles.action}>
            <IconOutline name="message" size={20} />
            <Text>56</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
