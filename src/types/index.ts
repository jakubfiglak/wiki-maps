import { Coords } from 'google-map-react';

export type WikiResponse<T> = {
  batchcomplete: string;
  query: T;
};

export type Article = {
  dist: number;
  lat: number;
  lon: number;
  ns: number;
  pageid: number;
  primary: string;
  title: string;
  color: Color;
};

export type ArticleDetails = {
  pageid: number;
  title: string;
  fullurl: string;
};

export type Color = 'orange' | 'blue';

export type Marker = Coords & { pageid: number; title: string; color: Color };
