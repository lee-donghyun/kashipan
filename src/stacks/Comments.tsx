import {IconOutline} from '@ant-design/icons-react-native';
import {useNavigation} from '@react-navigation/native';
import {useMemo, useState} from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {trigger as haptic} from 'react-native-haptic-feedback';

import {CommentItem} from '../components/Comment';
import {Spacer} from '../components/Spacer';
import {usePromise} from '../hooks/usePromise';
import {useThread} from '../hooks/useThread';
import {api} from '../services/api';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  padding: {
    paddingTop: 100,
  },
  w20: {
    width: 20,
  },
  inputContainer: {
    position: 'relative',
    margin: 16,
    padding: 8,
    paddingTop: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  submitButton: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    padding: 8,
  },
  submitButtonText: {
    color: '#3182F6',
    fontWeight: '600',
  },
  input: {padding: 0, paddingTop: 0, marginRight: 32, minHeight: 40},
});

export const Comments = () => {
  const navigation = useNavigation<any>();
  const postId = navigation.getState().routes.at(-1)?.params?.postId;

  const [content, setContent] = useState('');

  const {data, refresh, isLoading, isValidating, mutate} = useThread();
  const comments = useMemo(
    () =>
      data
        ?.flat()
        .find(post => post.id === postId)
        ?.comments.slice()
        .reverse(),
    [data, postId],
  );

  const {execute, isPending} = usePromise(async () => {
    api
      .post('/comment', {comment: content, postId: postId})
      .then(() => mutate())
      .then(() => setContent(''));
  });

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <IconOutline name="left" size={20} />
        </Pressable>
        <Text style={styles.headerTitle}>댓글</Text>
        <Spacer w={20} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          autoFocus
          multiline
          onChangeText={setContent}
          placeholder="@유저이름으로 댓글 달기..."
          style={styles.input}
          value={content}
        />
        <Pressable
          disabled={isPending}
          style={styles.submitButton}
          onPress={() => {
            haptic('impactMedium');
            execute();
          }}>
          <Text style={styles.submitButtonText}>게시</Text>
        </Pressable>
      </View>
      <FlatList
        data={comments}
        renderItem={CommentItem}
        refreshControl={
          <RefreshControl
            onRefresh={refresh}
            refreshing={!isPending && !isLoading && isValidating}
          />
        }
      />
    </View>
  );
};
