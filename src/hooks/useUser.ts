import {create} from 'zustand';

export type User = {};
export const useUser = create<{
  user: User;
  setUser: (user: User) => void;
}>(set => ({
  user: {} as User,
  setUser: user => set(user),
}));
