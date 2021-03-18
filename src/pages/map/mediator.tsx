import { Coords } from 'google-map-react';
import WikipediaApi from '../../services/api/wikipedia';

type Event = 'mapDragged' | 'someOtherEvent';

type Listeners = Record<Event, Function>;

const listeners: Listeners = {
  mapDragged: () => null,
  someOtherEvent: () => null,
};

export function emit(eventName: Event, ...args: any[]) {
  console.log(eventName, args);
  const listener = listeners[eventName];
  listener(...args);
}

function attachListener(eventName: Event, listener: Function) {
  listeners[eventName] = listener;
}

function useMapMediator() {
  async function mapDragged(center: Coords) {
    const articles = await WikipediaApi.getArticles({ coords: center });
    console.log('useMapMediator map articles', articles.query);
  }

  attachListener('mapDragged', mapDragged);
}

export default function MapMediator() {
  useMapMediator();

  return null;
}
