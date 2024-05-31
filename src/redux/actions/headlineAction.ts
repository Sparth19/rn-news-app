import {RootState} from '../store';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchHeadlines as fetchHeadlinesFromAPI} from '../../services/newsService';
import {
  clearHeadlines,
  getStoredHeadlines,
  storeHeadlines,
} from '../../utils/storage';
import {getRandomHeadlines} from '../../utils/newsUtils';

export const fetchHeadlines = createAsyncThunk(
  'headlines/fetchHeadlines',
  async () => {
    const storedHeadlines = await getStoredHeadlines();
    if (storedHeadlines.length > 0) {
      return storedHeadlines;
    }

    const fetchedHeadlines = await fetchHeadlinesFromAPI();
    await storeHeadlines(fetchedHeadlines);
    return fetchedHeadlines;
  },
);

export const loadNextBatch = createAsyncThunk(
  'headlines/loadNextBatch',
  async (_, {getState}) => {
    const state = getState() as RootState;
    const {allHeadlines, headlines} = state.headlines;

    if (allHeadlines.length <= headlines.length) {
      await clearHeadlines();
      const fetchedHeadlines = await fetchHeadlinesFromAPI();

      await storeHeadlines(fetchedHeadlines);
      return {
        allHeadlines: fetchedHeadlines,
        headlines: fetchedHeadlines.slice(0, 10),
      };
    } else {
      const shuffled = getRandomHeadlines(allHeadlines, 5);
      return {headlines: shuffled};
    }
  },
);
