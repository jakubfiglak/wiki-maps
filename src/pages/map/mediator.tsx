import { Coords } from 'google-map-react';
import { useMapStore } from './store';
import WikipediaApi from '../../services/api/wikipedia';
import { Marker, Article } from '../../types';

type Event =
  | 'mapDragged'
  | 'mapLoaded'
  | 'searchBoxPlacesSelected'
  | 'markerClicked';
type ListenerFn = (...args: Array<any>) => void;
type Listeners = Record<Event, ListenerFn>;

const listeners: Listeners = {
  mapDragged: () => null,
  mapLoaded: () => null,
  searchBoxPlacesSelected: () => null,
  markerClicked: () => null,
};

let map: any;

export function emit(eventName: Event, ...args: Parameters<ListenerFn>) {
  const listener = listeners[eventName];
  listener(...args);
}

function attachListener(eventName: Event, listener: ListenerFn) {
  listeners[eventName] = listener;
}

function mapWikipediaArticlesToMarkers(articles: Article[]): Marker[] {
  return articles.map(({ lat, lon, pageid, title }) => ({
    lat,
    lng: lon,
    pageid,
    title,
  }));
}

function useMapMediator() {
  const [
    ,
    { addMarkers, setGoogleApiLoaded, setModalVisible, setCurrentArticle },
  ] = useMapStore();

  async function mapDragged(center: Coords) {
    const response = await WikipediaApi.getArticles({
      coords: center,
      limit: 100,
    });
    const articles = mapWikipediaArticlesToMarkers(response.query.geosearch);
    addMarkers(articles);
  }

  async function mapLoaded(mapInstance: any) {
    map = mapInstance;
    console.log(map);
    setGoogleApiLoaded(true);
    // const response = await WikipediaApi.getArticles({ coords: center });
    // const articles = mapWikipediaArticlesToMarkers(response.query.geosearch);
    // addMarkers(articles);
  }

  function searchBoxPlacesSelected(position: Coords) {
    map.setCenter(position);
  }

  async function markerClicked(id: number) {
    const response = await WikipediaApi.getArticle({ id });
    const { fullurl, title } = response.query.pages[id];
    setCurrentArticle({ url: fullurl, title });
    setModalVisible(true);
  }

  attachListener('mapDragged', mapDragged);
  attachListener('mapLoaded', mapLoaded);
  attachListener('searchBoxPlacesSelected', searchBoxPlacesSelected);
  attachListener('markerClicked', markerClicked);
}

export default function MapMediator() {
  useMapMediator();

  return null;
}
