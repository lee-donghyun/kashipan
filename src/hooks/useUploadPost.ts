import {create} from 'zustand';

export type PostForm = {
  files: {type: 'video' | 'photo'; path: string}[];
  title: string;
  content: string;
};
const defaultPost: PostForm = {
  content: '',
  files: [],
  title: '',
};
export const useUploadPost = create<{
  post: PostForm;
  addFile: (file: PostForm['files'][number]) => void;
  setTitle: (title: PostForm['title']) => void;
  setContent: (content: PostForm['content']) => void;
  reset: () => void;
}>(set => ({
  post: defaultPost,
  addFile: file =>
    set(p => ({post: {...p.post, files: [...p.post.files, file]}})),
  setTitle: title => set(p => ({post: {...p.post, title}})),
  setContent: content => set(p => ({post: {...p.post, content}})),
  reset: () => set({post: defaultPost}),
}));
