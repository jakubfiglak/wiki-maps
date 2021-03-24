import { createStore, createHook, Action, defaults } from 'react-sweet-state';
import produce, { Draft } from 'immer';
import { Marker } from '../../types';

defaults.devtools = true;
defaults.mutator = (currentState, producer) => produce(currentState, producer);

type State = {
  readonly markers: Marker[];
  readonly googleApiLoaded: boolean;
  readonly isModalVisible: boolean;
  readonly currentArticle: {
    url: string;
    title: string;
  };
};

type Actions = typeof actions;

const initialState: State = {
  markers: [],
  googleApiLoaded: false,
  isModalVisible: false,
  currentArticle: {
    url: '',
    title: '',
  },
};

const actions = {
  addMarkers: (markers: Marker[]): Action<State> => ({
    setState,
    getState,
  }) => {
    const state = getState();
    const existingMarkers = state.markers.map((marker) => marker.pageid);
    const newMarkers = markers.filter(
      (marker) => !existingMarkers.includes(marker.pageid)
    );

    setState((draft: Draft<State>) => {
      draft.markers.push(...newMarkers);
    });
  },

  setGoogleApiLoaded: (value: boolean): Action<State> => ({ setState }) => {
    setState((draft: Draft<State>) => {
      draft.googleApiLoaded = value;
    });
  },

  setModalVisible: (value: boolean): Action<State> => ({ setState }) => {
    setState((draft: Draft<State>) => {
      draft.isModalVisible = value;
    });
  },

  setCurrentArticle: ({
    url,
    title,
  }: {
    url: string;
    title: string;
  }): Action<State> => ({ setState }) => {
    setState((draft: Draft<State>) => {
      draft.currentArticle = { url, title };
    });
  },
};

const Store = createStore<State, Actions>({
  initialState,
  actions,
  name: 'map-store',
});

export const useMapStore = createHook(Store);
