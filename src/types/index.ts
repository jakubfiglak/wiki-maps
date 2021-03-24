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
};

export type ArticleDetails = {
  pageid: number;
  title: string;
  fullurl: string;
};

export type Marker = Coords & { pageid: number; title: string };
