import {IconFill, IconOutline} from '@ant-design/icons-react-native';
import {useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {trigger as haptic} from 'react-native-haptic-feedback';

import {Post} from '../data-types/post';
import {usePromise} from '../hooks/usePromise';
import {useUser} from '../hooks/useUser';
import {api} from '../services/api';
import {likedStorage} from '../services/storage';
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
  const initialLiked = useRef(likedStorage.isLiked(post.id));

  const loginToken = useUser(store => store.user?.loginToken);
  const [liked, setLiked] = useState(initialLiked.current);

  const {execute} = usePromise(() =>
    api
      .post(`/post/${post.id}/like`, null, {headers: {loginToken}})
      .then(() => likedStorage.saveLiked(post.id)),
  );

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
              if (!liked) {
                // 현재는 좋아요 취소 불가능
                haptic('impactMedium');
                setLiked(!liked);
                execute();
              }
            }}>
            {liked ? (
              <IconFill color="red" name="heart" size={20} />
            ) : (
              <IconOutline name="heart" size={20} />
            )}
            <Text>
              {initialLiked.current && !liked
                ? post.like - 1
                : !initialLiked.current && liked
                ? post.like + 1
                : post.like}
            </Text>
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
