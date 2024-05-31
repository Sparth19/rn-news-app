import uuid from 'react-native-uuid';
import {Headline, NewsItem} from '../types/interfaces';

export const sanitizeNewsData = (data: NewsItem[]): Headline[] => {
  return data.map(item => ({
    ...item,
    id: uuid.v4(),
  }));
};

export const getRandomHeadlines = (headlines: any[], count: number): any[] => {
  const shuffled = headlines.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getImage = (value: string) => {
  const images: {[key: string]: any} = {
    ign: require('../assets/media/ign.png'),
    techcrunch: require('../assets/media/techchrunch.jpeg'),
    'the-next-web': require('../assets/media/tnw.png'),
  };

  return images[value];
};
