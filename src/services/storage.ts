import AsyncStorage from '@react-native-async-storage/async-storage';

import {Post} from '../data-types/post';

class AuthStorage {
  static TOKEN_KEY = 'TOKEN';
  constructor() {}
  async getToken(): Promise<string> {
    const token = await AsyncStorage.getItem(AuthStorage.TOKEN_KEY);
    if (token === null) {
      throw new Error('');
    }
    return token;
  }
  async saveToken(token: string): Promise<void> {
    await AsyncStorage.setItem(AuthStorage.TOKEN_KEY, token);
  }
  async removeToken(): Promise<void> {
    await AsyncStorage.removeItem(AuthStorage.TOKEN_KEY);
  }
}
class LikedStorage {
  static LIKED_KEY = 'LIKED';
  private liked: Set<Post['id']>;
  constructor() {
    this.liked = new Set();
    AsyncStorage.getItem(LikedStorage.LIKED_KEY).then(liked => {
      if (liked !== null) {
        this.liked = new Set(JSON.parse(liked));
      }
    });
  }
  isLiked(id: Post['id']) {
    return this.liked.has(id);
  }
  saveLiked(id: Post['id']) {
    this.liked.add(id);
    return AsyncStorage.setItem(
      LikedStorage.LIKED_KEY,
      JSON.stringify(Array.from(this.liked)),
    );
  }
  removeLiked(id: Post['id']) {
    this.liked.delete(id);
    return AsyncStorage.removeItem(LikedStorage.LIKED_KEY);
  }
}

export const authStorage = new AuthStorage();
export const likedStorage = new LikedStorage();
