declare module 'react-sweet-state' {
  // this allows setState to be called with a function instead of allowing only Partial<TState>
  // remember also that TState should be writable, as immer expects you to mutate it
  interface SetState<TState> {
    (producer: (draftState: TState) => void): void;
  }
}
