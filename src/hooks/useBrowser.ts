import {WebViewProps} from 'react-native-webview';
import {create} from 'zustand';

export const useBrowser = create<{
  getIsOpen: () => boolean;
  open: (props: WebViewProps) => void;
  props: WebViewProps | null;
  close: () => void;
}>((set, get) => ({
  open: props => set({props}),
  props: null,
  close: () => set({props: null}),
  getIsOpen: () => get().props !== null,
}));
