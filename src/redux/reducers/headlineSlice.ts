import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchHeadlines, loadNextBatch} from '../actions/headlineAction';
import {Headline} from '../../types/interfaces';

interface HeadlinesState {
  headlines: Headline[];
  allHeadlines: Headline[];
  pinnedHeadlines: Headline[];
  loading: boolean;
  error: string | null;
}

const initialState: HeadlinesState = {
  headlines: [],
  allHeadlines: [],
  pinnedHeadlines: [],
  loading: false,
  error: null,
};

const headlinesSlice = createSlice({
  name: 'headlines',
  initialState,
  reducers: {
    pinHeadline: (state, action: PayloadAction<Headline>) => {
      state.pinnedHeadlines.unshift(action.payload);
      state.headlines = state.headlines.filter(
        item => item.id !== action.payload.id,
      );
    },
    unpinHeadline: (state, action: PayloadAction<Headline>) => {
      state.pinnedHeadlines = state.pinnedHeadlines.filter(
        item => item.id !== action.payload.id,
      );
      state.headlines.unshift(action.payload);
    },
    deleteHeadline: (state, action: PayloadAction<Headline>) => {
      state.headlines = state.headlines.filter(
        item => item.id !== action.payload.id,
      );
      state.pinnedHeadlines = state.pinnedHeadlines.filter(
        item => item.id !== action.payload.id,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHeadlines.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeadlines.fulfilled, (state, action) => {
        state.loading = false;
        state.allHeadlines = action.payload;
        state.headlines = action.payload.slice(0, 10);
      })
      .addCase(fetchHeadlines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch headlines';
      })
      .addCase(loadNextBatch.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadNextBatch.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.allHeadlines) {
          state.allHeadlines = action.payload.allHeadlines;
          state.headlines = action.payload.headlines;
        } else {
          state.headlines = [...action.payload.headlines, ...state.headlines];
        }
      })
      .addCase(loadNextBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load next batch';
      });
  },
});

export const {pinHeadline, unpinHeadline, deleteHeadline} =
  headlinesSlice.actions;

export default headlinesSlice.reducer;
