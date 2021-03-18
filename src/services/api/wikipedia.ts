import ky from 'ky';
import { GetArticlesArgs, WikiResponse } from './types';

const client = ky.create({ prefixUrl: 'https://pl.wikipedia.org/w' });

const api = {
  getArticles({
    coords,
    radius = 10000,
    limit = 10,
  }: GetArticlesArgs): Promise<WikiResponse> {
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
          gscoord: `${coords.lat}|${coords.lng}`,
          gsradius: radius,
          gslimit: limit,
        },
      })
      .json();
  },
};

export default api;
