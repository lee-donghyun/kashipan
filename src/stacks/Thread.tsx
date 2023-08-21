import {NativeStackScreenProps} from '@react-navigation/native-stack';
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

export const Thread = ({navigation}: NativeStackScreenProps<any>) => {
  const {mutate, isLoading, isValidating, setSize, size} = useSWRInfinite(
    size => ['/thread', {size}],
  );

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{DOMAIN}</Text>
      </View>
      <FlatList
        ref={ref => mainScreenMutable.setThreadRef(ref)}
        data={Array(10 * size).fill(0)}
        onEndReached={() => setSize(size => size + 1)}
        refreshControl={
          <RefreshControl
            onRefresh={() => mutate()}
            refreshing={!isLoading && isValidating}
          />
        }
        renderItem={() => (
          <Post
            onPressComments={() => {
              navigation.push(Comments.name);
              mainScreenMutable.addDepth();
            }}
          />
        )}
      />
    </View>
  );
};
