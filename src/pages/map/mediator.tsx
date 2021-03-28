import { Coords } from 'google-map-react';
import { useMapStore } from './store';
import WikipediaApi from '../../services/api/wikipedia';
import ArticlesDatabase from '../../services/ArticlesDatabase';
import { Marker, Article, DBArticle } from '../../types';
import debounce from 'p-debounce';

type Event = 'mapLoaded' | 'placeSelected' | 'markerClicked';
type ListenerFn = (...args: Array<any>) => void;
type Listeners = Record<Event, ListenerFn>;

const listeners: Listeners = {
  mapLoaded: () => null,
  placeSelected: () => null,
  markerClicked: () => null,
};

let map: google.maps.Map;

export function emit(eventName: Event, ...args: Parameters<ListenerFn>) {
  const listener = listeners[eventName];
  listener(...args);
}

function attachListener(eventName: Event, listener: ListenerFn) {
  listeners[eventName] = listener;
}

function mapWikipediaArticlesToMarkers(articles: Article[]): Marker[] {
  return articles.map(({ lat, lon, pageid, title, color }) => ({
    lat,
    lng: lon,
    pageid,
    title,
    color,
  }));
}

function mapReadArticles(articles: Article[]): Article[] {
  return articles.map(({ pageid, ...rest }) => ({
    ...rest,
    pageid,
    color: ArticlesDatabase.isArticleRead(pageid) ? 'blue' : 'orange',
  }));
}

function useMapMediator() {
  const [
    { markers },
    {
      addMarkers,
      setGoogleApiLoaded,
      setModalVisible,
      setCurrentArticle,
      setMarkerColor,
    },
  ] = useMapStore();

  async function getArticlesForMapCenter() {
    const response = await WikipediaApi.getArticles({
      coords: map.getCenter().toJSON(),
      limit: 100,
    });
    const articles = mapReadArticles(response.query.geosearch);
    const markers = mapWikipediaArticlesToMarkers(articles);
    addMarkers(markers);
  }

  function mapLoaded(mapInstance: google.maps.Map) {
    map = mapInstance;
    map.addListener('center_changed', debounce(getArticlesForMapCenter, 500));

    getArticlesForMapCenter();
    setGoogleApiLoaded(true);
  }

  function placeSelected(position: Coords) {
    map.setCenter(position);
  }

  function getReadArticleData(id: number): DBArticle {
    const marker = markers.find((mark) => mark.pageid === id)!;
    const { pageid, title, lat, lng } = marker;
    return {
      id: pageid,
      title,
      coords: { lat, lng },
      readDate: new Date().toLocaleString(),
    };
  }

  async function markerClicked(id: number) {
    const response = await WikipediaApi.getArticle({ id });
    const { fullurl, title } = response.query.pages[id];

    setCurrentArticle({ url: fullurl, title });
    setModalVisible(true);
    setMarkerColor({ id, color: 'blue' });

    ArticlesDatabase.setArticleAsRead(getReadArticleData(id));
  }

  attachListener('mapLoaded', mapLoaded);
  attachListener('placeSelected', placeSelected);
  attachListener('markerClicked', markerClicked);
}

export default function MapMediator() {
  useMapMediator();

  return null;
}
