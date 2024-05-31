import AsyncStorage from '@react-native-async-storage/async-storage';

const HEADLINES_KEY = 'HEADLINES';

export const storeHeadlines = async (headlines: any[]) => {
  try {
    const jsonValue = JSON.stringify(headlines);
    await AsyncStorage.setItem(HEADLINES_KEY, jsonValue);
  } catch (error) {
    throw new Error('Failed to store headlines');
  }
};

export const getStoredHeadlines = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(HEADLINES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    throw new Error('Failed to retrieve headlines');
  }
};

export const clearHeadlines = async () => {
  try {
    await AsyncStorage.removeItem(HEADLINES_KEY);
  } catch (error) {
    throw new Error('Failed to clear headlines');
  }
};
