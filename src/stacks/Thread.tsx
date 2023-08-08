import {StyleSheet, View, Text, ScrollView, RefreshControl} from 'react-native';
import {Post} from '../components/Post';
import {DOMAIN} from '../services/constant';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Comments} from './Comments';
import {mainScreenMutable} from '../services/mutables';
import useSWR from 'swr';

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
  const {mutate, isLoading, isValidating} = useSWR(['/thread', {}]);
  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{DOMAIN}</Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={!isLoading && isValidating}
            onRefresh={() => mutate()}
          />
        }
        ref={ref => mainScreenMutable.setThreadRef(ref)}>
        {Array(10)
          .fill(0)
          .map((_, key) => (
            <Post
              key={key}
              onPressComments={() => {
                navigation.push(Comments.name);
                mainScreenMutable.addDepth();
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
};
Thread.name = 'Thread';
