import {animated, useSpring} from '@react-spring/native';
import {useState} from 'react';
import {ImageStyle, StyleProp} from 'react-native';

export const Image = ({
  uri,
  style,
}: {
  uri: string;
  style?: StyleProp<ImageStyle>;
}) => {
  const [loaded, setLoaded] = useState(false);
  const opacity = useSpring({
    opacity: loaded ? 1 : 0,
  });

  return (
    <animated.Image
      source={{uri}}
      style={[opacity, style]}
      onLoad={() => {
        setLoaded(true);
      }}
    />
  );
};
