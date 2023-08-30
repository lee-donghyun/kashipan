import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCallback} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import useSWRInfinite from 'swr/infinite';

import {Post} from '../components/Post';
import {DOMAIN} from '../services/constant';
import {mainScreenMutable} from '../services/mutables';
import {Comments} from './Comments';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
const PAGE_SIZE = 10;

export const Thread = ({navigation}: NativeStackScreenProps<any>) => {
  const {data, mutate, isLoading, isValidating, setSize} = useSWRInfinite<
    Post[]
  >(page => ['/post', {page, size: PAGE_SIZE}]);

  const RenderItem = useCallback(
    ({item}: {item: Post}) => (
      <Post
        post={item}
        onPressComments={() => {
          navigation.push(Comments.name);
          mainScreenMutable.addDepth();
        }}
      />
    ),
    [navigation],
  );

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{DOMAIN}</Text>
      </View>
      <FlatList
        ref={ref => mainScreenMutable.setThreadRef(ref)}
        data={data?.flat()}
        onEndReached={() => setSize(_size => _size + 1)}
        renderItem={RenderItem}
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
