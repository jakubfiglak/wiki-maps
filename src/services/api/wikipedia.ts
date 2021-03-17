import { Coords } from 'google-map-react';
import ky from 'ky';
import { WikiResponse } from './types';

const client = ky.create({ prefixUrl: 'https://pl.wikipedia.org/w' });

type GetArticlesParams = {
  coord: Coords;
  radius?: number;
  limit?: number;
};

const api = {
  getArticles({
    coord,
    radius = 10000,
    limit = 10,
  }: GetArticlesParams): Promise<WikiResponse> {
    const params = {
      action: 'query',
      list: 'geosearch',
      format: 'json',
      origin: '*',
    };

    return client
      .get('api.php?', {
        searchParams: {
          ...params,
          gscoord: `${coord.lat}|${coord.lng}`,
          gsradius: radius,
          gslimit: limit,
        },
      })
      .json();
  },
};

export default api;
