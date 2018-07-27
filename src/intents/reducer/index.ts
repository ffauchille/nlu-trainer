import { Reducer } from "redux";
import { AppIntentsLoadedAction, AppIntentsLoaded, Actions, UnselectIntentAction } from "../actions";
import { Intent } from "../../models/Intent";

type State = {
  appIntents: Intent[],
  selected?: Intent
};

export const defaultState = (): State => ({
  appIntents: []
});

export const reducer: Reducer<State> = (
  state: State = defaultState(),
  action
): State => {
  switch (action.type) {
    case AppIntentsLoadedAction: {
      return {
        ...state,
        appIntents: (action as AppIntentsLoaded).intents
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
