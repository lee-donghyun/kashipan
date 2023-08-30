import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCallback} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';

import {PostItem} from '../components/Post';
import {Post} from '../data-types/post';
import {useThread} from '../hooks/useThread';
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

export const Thread = ({navigation}: NativeStackScreenProps<any>) => {
  const {data, refresh, isLoading, isValidating, loadMore} = useThread();
  const RenderItem = useCallback(
    ({item}: {item: Post}) => (
      <PostItem
        post={item}
        onPressComments={() => {
          navigation.push(Comments.name, {postId: item.id});
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
        onEndReached={loadMore}
        renderItem={RenderItem}
        refreshControl={
          <RefreshControl
            onRefresh={refresh}
            refreshing={!isLoading && isValidating}
          />
        }
      />
    </View>
  );
};
