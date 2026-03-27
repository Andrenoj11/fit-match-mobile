import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_STORAGE_KEY = "fit-match-auth";

type StoredAuth = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export const tokenStorage = {
  async getAuth() {
    const value = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as StoredAuth;
  },

  async setAuth(data: StoredAuth) {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
  },

  async removeAuth() {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  },
};
