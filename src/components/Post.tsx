import {IconFill, IconOutline} from '@ant-design/icons-react-native';
import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {trigger as haptic} from 'react-native-haptic-feedback';

import {Post} from '../data-types/post';
import {Image} from './Image';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    flexBasis: '50%',
    aspectRatio: 1,
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

export const PostItem = ({
  onPressComments,
  post,
}: {
  onPressComments: () => void;
  post: Post;
}) => {
  const [liked, setLiked] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{post.title}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{post.content}</Text>
      </View>
      <View style={styles.imageContainer}>
        {post.files.map(file => (
          <Image key={file} style={styles.image} uri={file} />
        ))}
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.author}>@{post.userId}</Text>
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
            <Text>{post.like}</Text>
          </Pressable>
          <Pressable onPress={onPressComments} style={styles.action}>
            <IconOutline name="message" size={20} />
            <Text>{post.comments.length}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
