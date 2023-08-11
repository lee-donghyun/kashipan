import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {Post, useUploadPost} from '../hooks/useUploadPost';
import {SafeAreaView} from '../components/SafeAreaView';
import {IconOutline} from '@ant-design/icons-react-native';
import {Colors} from '../services/constant';
import {useNavigation} from '@react-navigation/native';
import {Spacer} from '../components/Spacer';
import Video from 'react-native-video';
import {MemoedGrid} from '../components/Grid';
import {Main} from '../screens/Main';

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
      source={{uri: file.path}}
      key={file.path}
      resizeMode="cover"
      style={styles.image}
      repeat
    />
  ) : null;

const getKeyFromFile = (file: Post['files'][number] | undefined) => file?.path;

export const TakePost = () => {
  const {
    post: {title, content, files},
    setContent,
    setTitle,
  } = useUploadPost();
  const navigation = useNavigation<any>();
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
            style={({pressed}) => [
              styles.actionButton,
              pressed && {opacity: 0.6},
            ]}
            onPress={() => {
              navigation.navigate(Main.name);
            }}>
            <IconOutline name="up" size={20} color={Colors.WHITE} />
            <Text style={styles.actionButtonText}>공유</Text>
          </Pressable>
        </View>
        <ScrollView style={styles.contentContainer}>
          <Spacer h={20} />
          <Text style={styles.label}>제목</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={title}
              style={styles.titleInput}
              onChangeText={setTitle}
            />
          </View>
          <Spacer h={40} />
          <Text style={styles.label}>내용</Text>
          <View style={styles.inputContainer}>
            <TextInput
              multiline
              style={styles.contentInput}
              value={content}
              onChangeText={setContent}
            />
          </View>
          <Spacer h={80} />
          <MemoedGrid
            data={files}
            numColumns={2}
            renderItem={renderFile}
            getKey={getKeyFromFile}
          />
          <Spacer h={160} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
