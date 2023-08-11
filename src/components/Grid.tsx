import {memo} from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
  },
});

const groupBy = <T,>(data: T[], number: number) =>
  data.reduce(
    (acc, value, index) =>
      index % number === 0
        ? [...acc, [value]]
        : [...acc.slice(0, -1), [...(acc.at(-1) ?? [value]), value]],
    [] as T[][],
  );

export const Grid = <Key extends string, Props extends {[key in Key]: string}>({
  data,
  numColumns,
  renderItem,
  getKey,
}: {
  numColumns: number;
  renderItem: (item: Props) => JSX.Element | null;
  data: Props[];
  getKey: (item: Props | undefined) => Key | undefined;
}) => {
  return (
    <View>
      {groupBy(data, numColumns).flatMap(rows => (
        <View key={getKey(rows.at(0))} style={styles.container}>
          {rows.map(value => (
            <View key={getKey(value)} style={styles.cell}>
              {renderItem(value)}
            </View>
          ))}
          {Array(numColumns - rows.length)
            .fill(0)
            .map((_, key) => (
              <View key={key} style={styles.cell} />
            ))}
        </View>
      ))}
    </View>
  );
};

export const MemoedGrid = memo(Grid) as typeof Grid;
