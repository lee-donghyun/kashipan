import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {DOMAIN} from '../services/constant';
import {Post} from '../components/Post';

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

export const Home = () => {
  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{DOMAIN}</Text>
      </View>
      <ScrollView>
        {Array(10)
          .fill(0)
          .map((_, key) => (
            <Post key={key} />
          ))}
      </ScrollView>
    </View>
  );
};
Home.name = 'Home';
