import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appearance} from 'react-native';

export const loadTheme = createAsyncThunk('theme/loadTheme', async () => {
  const deviceTheme = Appearance.getColorScheme();
  const storedTheme = await AsyncStorage.getItem('theme');
  return storedTheme ? JSON.parse(storedTheme) : deviceTheme || 'light';
});

export const setTheme = createAsyncThunk(
  'theme/setTheme',
  async (theme: string, {}) => {
    await AsyncStorage.setItem('theme', JSON.stringify(theme));
    return theme;
  },
);
