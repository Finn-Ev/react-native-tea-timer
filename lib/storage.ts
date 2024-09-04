import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export class Storage {
  private static instance: Storage;

  private constructor() {}

  public static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }

  public async getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    }
    return await AsyncStorage.getItem(key);
  }

  public async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  }

  public async removeItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  }
}

// Usage
const storage = Storage.getInstance();

export default storage;
