import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Comment} from '../components/Comment';
import {IconOutline} from '@ant-design/icons-react-native';
import {useNavigation} from '@react-navigation/native';
import useSWRInfinite from 'swr/infinite';
import {mainScreenMutable} from '../services/mutables';
import {Spacer} from '../components/Spacer';

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
  const navigation = useNavigation();
  const {mutate, isLoading, isValidating, setSize, size} = useSWRInfinite(
    size => ['/thread', {size}],
  );
  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
            mainScreenMutable.removeDepth();
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
          placeholder="@유저이름으로 댓글 달기..."
          style={styles.input}
        />
        <Pressable style={styles.submitButton}>
          <Text style={styles.submitButtonText}>게시</Text>
        </Pressable>
      </View>
      <FlatList
        data={Array(10 * size).fill(0)}
        onEndReached={() => setSize(size => size + 1)}
        renderItem={Comment}
        refreshControl={
          <RefreshControl
            onRefresh={() => mutate()}
            refreshing={!isLoading && isValidating}
          />
        }
      />
    </View>
  );
};
