import ky from 'ky';
import { Coords } from 'google-map-react';
import { Article, ArticleDetails, WikiResponse } from '../../types';

const client = ky.create({ prefixUrl: 'https://pl.wikipedia.org/w' });

type GetArticlesArgs = {
  coords: Coords;
  radius?: number;
  limit?: number;
};

type GetArticleArgs = { id: number };

type ArticlesResponse = WikiResponse<{ geosearch: Article[] }>;
type ArticleDetailsResponse = WikiResponse<{
  pages: Record<string, ArticleDetails>;
}>;

const api = {
  getArticles({
    coords,
    radius = 10000,
    limit = 10,
  }: GetArticlesArgs): Promise<ArticlesResponse> {
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

  getArticle({ id }: GetArticleArgs): Promise<ArticleDetailsResponse> {
    const params = {
      action: 'query',
      pageids: id,
      format: 'json',
      origin: '*',
      prop: 'info',
      inprop: 'url',
    };

    return client
      .get('api.php?', {
        searchParams: {
          ...params,
        },
      })
      .json();
  },
};

export default api;
