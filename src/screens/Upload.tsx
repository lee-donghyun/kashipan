import {ScrollView, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
