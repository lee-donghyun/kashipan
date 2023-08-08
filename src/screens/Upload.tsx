import {ScrollView, StyleSheet, Text} from 'react-native';
import {Colors} from '../services/constant';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 40,
  },
});

export const Upload = () => {
  return (
    <ScrollView style={styles.background}>
      <Text>Upload</Text>
    </ScrollView>
  );
};
Upload.name = 'Upload';
