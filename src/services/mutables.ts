import {ScrollView} from 'react-native';

class MainScreenMutable {
  private depth: number;
  private threadRef: ScrollView | null;
  constructor() {
    this.depth = 0;
    this.threadRef = null;
  }
  setThreadRef(ref: ScrollView | null) {
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
    this.threadRef?.scrollTo({y: 0, animated: true});
  }
}
export const mainScreenMutable = new MainScreenMutable();
