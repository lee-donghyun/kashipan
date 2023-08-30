import {create} from 'zustand';

export type User = {
  email: string;
  profileImage: string;
  loginToken: string;
};
export const useUser = create<{
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
}>(set => ({
  user: null,
  setUser: user => set({user}),
  resetUser: () => set({user: null}),
}));
