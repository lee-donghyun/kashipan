import {View, Text} from 'react-native';
import {useUploadPost} from '../hooks/useUploadPost';

export const TakePost = () => {
  const files = useUploadPost();
  return (
    <View>
      <Text>{JSON.stringify(files)}</Text>
    </View>
  );
};
