import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Post} from '../components/Post';
import {DOMAIN} from '../services/constant';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Comments} from './Comments';
import {mainScreen} from '../services/mutables';

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
  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{DOMAIN}</Text>
      </View>
      <ScrollView ref={ref => (mainScreen.threadRef = ref)}>
        {Array(10)
          .fill(0)
          .map((_, key) => (
            <Post
              key={key}
              onPressComments={() => {
                navigation.push(Comments.name);
                mainScreen.depth = 1;
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
};
Thread.name = 'Thread';
