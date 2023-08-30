import {Comment} from './comment';

export type Post = {
  id: number;
  userId: number;
  title: string;
  content: string;
  view: number;
  createdAt: Date;
  files: string[];
  like: number;
  comments: Comment[];
};
