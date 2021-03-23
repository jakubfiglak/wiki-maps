import { Coords } from 'google-map-react';

export type WikiArticle = {
  dist: number;
  lat: number;
  lon: number;
  ns: number;
  pageid: number;
  primary: string;
  title: string;
};

export type Marker = Coords & { pageid: number };
