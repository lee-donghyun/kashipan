import {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

export const Spacer = ({h, w}: {w?: number; h?: number}) => {
  const style = useMemo(
    () => StyleSheet.create({style: {width: w, height: h}}).style,
    [h, w],
  );
  return <View style={style} />;
};
