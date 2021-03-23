import { Coords } from 'google-map-react';
import { useMapStore } from './store';
import WikipediaApi from '../../services/api/wikipedia';
import { Marker, WikiArticle } from '../../types';

type Event = 'mapDragged' | 'mapLoaded';
type ListenerFn = (...args: Array<Coords>) => void;
type Listeners = Record<Event, ListenerFn>;

const listeners: Listeners = {
  mapDragged: () => null,
  mapLoaded: () => null,
};

export function emit(eventName: Event, ...args: Parameters<ListenerFn>) {
  const listener = listeners[eventName];
  listener(...args);
}

function attachListener(eventName: Event, listener: ListenerFn) {
  listeners[eventName] = listener;
}

function mapWikipediaArticlesToMarkers(articles: WikiArticle[]): Marker[] {
  return articles.map(({ lat, lon, pageid }) => ({
    lat,
    lng: lon,
    pageid,
  }));
}

function useMapMediator() {
  const [, { addMarkers }] = useMapStore();

  async function mapDragged(center: Coords) {
    const response = await WikipediaApi.getArticles({
      coords: center,
      limit: 100,
    });
    const articles = mapWikipediaArticlesToMarkers(response.query.geosearch);
    addMarkers(articles);
  }

  async function mapLoaded(center: Coords) {
    const response = await WikipediaApi.getArticles({ coords: center });
    const articles = mapWikipediaArticlesToMarkers(response.query.geosearch);
    addMarkers(articles);
  }

  attachListener('mapDragged', mapDragged);
  attachListener('mapLoaded', mapLoaded);
}

export default function MapMediator() {
  useMapMediator();

  return null;
}
