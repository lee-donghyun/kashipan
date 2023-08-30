import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const authStorage = new AuthStorage();
