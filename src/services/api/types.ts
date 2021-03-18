import { Coords } from 'google-map-react';

export type GetArticlesArgs = {
  coords: Coords;
  radius?: number;
  limit?: number;
};

type Article = {
  dist: number;
  lat: number;
  lon: number;
  ns: number;
  pageid: number;
  primary: string;
  title: string;
};

export type WikiResponse = {
  batchcomplete: string;
  query: {
    geosearch: Article[];
  };
};
