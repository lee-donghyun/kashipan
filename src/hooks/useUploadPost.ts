import {create} from 'zustand';

export type Post = {
  files: {type: 'video' | 'photo'; path: string}[];
  title: string;
  content: string;
};
const defaultPost: Post = {
  content: '',
  files: [],
  title: '',
};
export const useUploadPost = create<{
  post: Post;
  addFile: (file: Post['files'][number]) => void;
  setTitle: (title: Post['title']) => void;
  setContent: (content: Post['content']) => void;
  reset: () => void;
}>(set => ({
  post: defaultPost,
  addFile: file =>
    set(p => ({post: {...p.post, files: [...p.post.files, file]}})),
  setTitle: title => set(p => ({post: {...p.post, title}})),
  setContent: content => set(p => ({post: {...p.post, content}})),
  reset: () => set({post: defaultPost}),
}));
