import { Reducer } from "redux";
import { AppIntentsLoadedAction, AppIntentsLoaded, UnselectIntentAction } from "../actions";
import { Intent } from "../../models/intent";

type State = {
  all: Intent[],
  selected?: Intent
};

export const defaultState = (): State => ({
  all: []
});

export const reducer: Reducer<State> = (
  state: State = defaultState(),
  action
): State => {
  switch (action.type) {
    case AppIntentsLoadedAction: {
      return {
        ...state,
        all: (action as AppIntentsLoaded).intents
      };
    }
    case UnselectIntentAction: {
      return {
        ...state,
        selected: undefined
      }
    }
    default: {
      return state;
    }
  }
};

export type IntentState = { intents: State }

export default { intents: reducer }
