import {FlatList} from 'react-native';

class MainScreenMutable {
  private depth: number;
  private threadRef: FlatList | null;
  constructor() {
    this.depth = 0;
    this.threadRef = null;
  }
  setThreadRef(ref: FlatList | null) {
    this.threadRef = ref;
  }
  addDepth() {
    this.depth = 1;
  }
  removeDepth() {
    this.depth = 0;
  }
  getDepth() {
    return this.depth;
  }
  scrollToTop() {
    this.threadRef?.scrollToIndex({index: 0, animated: true});
  }
}
export const mainScreenMutable = new MainScreenMutable();
