import {create} from 'zustand';

export type User = {
  email: string;
  profileImage: string;
};
export const useUser = create<{
  user: User | null;
  setUser: (user: User) => void;
}>(set => ({
  user: null,
  setUser: user => set({user}),
}));
