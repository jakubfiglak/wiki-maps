import { createStore, createHook, Action, defaults } from 'react-sweet-state';
import produce, { Draft } from 'immer';
import { Marker } from '../../types';

defaults.devtools = true;
defaults.mutator = (currentState, producer) => produce(currentState, producer);

type State = {
  readonly markers: Marker[];
};

type Actions = typeof actions;

const initialState: State = {
  markers: [],
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
};

const Store = createStore<State, Actions>({
  initialState,
  actions,
  name: 'map-store',
});

export const useMapStore = createHook(Store);
