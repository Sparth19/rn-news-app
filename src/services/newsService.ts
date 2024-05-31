import axios from 'axios';
import {sanitizeNewsData} from '../utils/newsUtils';

const API_KEY = process.env.NEWS_API_KEY;
const API_URL = 'https://newsapi.org/v2/everything';

export const fetchHeadlines = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        pageSize: 100,
        apiKey: API_KEY,
        domains: 'techcrunch.com,thenextweb.com,ign.com',
        language: 'en',
      },
    });

    if (response.status === 200) {
      console.log('response.data.articles', response.data.articles.length);
      return sanitizeNewsData(response.data.articles || []);
    } else {
      throw new Error('Failed to fetch headlines');
    }
  } catch (error) {
    throw error;
  }
};
