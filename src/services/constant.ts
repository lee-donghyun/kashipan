import {Dimensions as RNDimensions} from 'react-native';

export const DOMAIN = 'KASHIPAN';

export enum Colors {
  WHITE = '#FFFFFF',
  BLACK = '#000000',
  GRAY = '#A1A1A1',
}

export enum Dimensions {
  WIDTH = RNDimensions.get('window').width,
  HEIGHT = RNDimensions.get('window').height,
}
