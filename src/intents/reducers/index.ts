import { Reducer } from "redux";
import { loadIntentsAction } from "../actions";

export type State = {};

export const defaultState = (): State => ({});

export const reducer: Reducer<State> = (
  state: State = defaultState(),
  action
): State => {
  switch (action.type) {
    case loadIntentsAction: {
      return state;
    }
    default: {
      return state;
    }
  }
};
