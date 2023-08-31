import {IconOutline} from '@ant-design/icons-react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {trigger as haptic} from 'react-native-haptic-feedback';
import Video from 'react-native-video';

import {MemoedGrid} from '../components/Grid';
import {SafeAreaView} from '../components/SafeAreaView';
import {Spacer} from '../components/Spacer';
import {usePromise} from '../hooks/usePromise';
import {Post, useUploadPost} from '../hooks/useUploadPost';
import {Main} from '../screens/Main';
import {api} from '../services/api';
import {Colors} from '../services/constant';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
  },
  inputContainer: {
    marginTop: 12,
    padding: 8,
    paddingTop: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  titleInput: {padding: 0, paddingTop: 0},
  contentInput: {padding: 0, paddingTop: 0, minHeight: 40},
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    flexBasis: '50%',
    aspectRatio: 1,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 80,
  },
  actionButton: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    backgroundColor: Colors.BLACK,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionButtonText: {
    fontWeight: '600',
    color: Colors.WHITE,
  },
});

const renderFile = (file: Post['files'][number]) =>
  file.type === 'photo' ? (
    <Image key={file.path} source={{uri: file.path}} style={styles.image} />
  ) : file.type === 'video' ? (
    <Video
      key={file.path}
      repeat
      resizeMode="cover"
      source={{uri: file.path}}
      style={styles.image}
    />
  ) : null;

const getKeyFromFile = (file: Post['files'][number] | undefined) => file?.path;

export const TakePost = () => {
  const navigation = useNavigation<any>();

  const {
    post: {title, content, files},
    setContent,
    setTitle,
  } = useUploadPost();

  const {execute} = usePromise(async () => {
    const paths = await Promise.all(files.map(file => uploadFile(file.path)));
    await api.post('/post', {title, content, files: paths});
    navigation.navigate(Main.name);
  });

  const disabled = title.length === 0 || content.length === 0;

  return (
    <SafeAreaView>
      <View style={styles.background}>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <IconOutline name="left" size={20} />
          </Pressable>
          <Pressable
            disabled={disabled}
            onPress={() => {
              haptic('impactMedium');
              execute();
            }}
            style={({pressed}) => [
              styles.actionButton,
              disabled && {opacity: 0.2},
              pressed && {opacity: 0.6},
            ]}>
            <IconOutline color={Colors.WHITE} name="up" size={20} />
            <Text style={styles.actionButtonText}>공유</Text>
          </Pressable>
        </View>
        <ScrollView style={styles.contentContainer}>
          <Spacer h={20} />
          <Text style={styles.label}>제목</Text>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={setTitle}
              style={styles.titleInput}
              value={title}
            />
          </View>
          <Spacer h={40} />
          <Text style={styles.label}>내용</Text>
          <View style={styles.inputContainer}>
            <TextInput
              multiline
              onChangeText={setContent}
              style={styles.contentInput}
              value={content}
            />
          </View>
          <Spacer h={80} />
          <MemoedGrid
            data={files}
            getKey={getKeyFromFile}
            numColumns={2}
            renderItem={renderFile}
          />
          <Spacer h={160} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const uploadFile = async (localPath: string) => {
  const form = new FormData();
  form.append('file', {
    uri: localPath,
    name: 'test',
    type: 'image/jpeg', // 동영상 분기 추가 필요
  });
  const {data} = await api.post<{path: string}>('/file/upload', form, {
    transformRequest: [formData => formData],
  });
  return data.path;
};
