import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loadTheme, setTheme} from '../actions/themeAction';
import {Appearance} from 'react-native';

interface ThemeState {
  theme: string;
  loading: boolean;
  error: string | null;
}
const deviceTheme = Appearance.getColorScheme();

const initialState: ThemeState = {
  theme: deviceTheme || 'light',
  loading: false,
  error: null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadTheme.pending, state => {
        state.loading = true;
      })
      .addCase(loadTheme.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.theme = action.payload;
      })
      .addCase(loadTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load theme';
      })
      .addCase(setTheme.pending, state => {
        state.loading = true;
      })
      .addCase(setTheme.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.theme = action.payload;
      })
      .addCase(setTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to set theme';
      });
  },
});

export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;
