import { Reducer } from "redux";
import { AppIntentsLoadedAction, AppIntentsLoaded, UnselectIntentAction, IntentSelectedAction, IntentSelected, intentDeleted, IntentDeletedAction } from "../actions";
import { Intent } from "../../models/intent";
import { removeAtIndex } from "../../utils";

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
    case IntentSelectedAction: {
      return {
        ...state,
        selected: (action as IntentSelected).intent
      }
    }
    case UnselectIntentAction: {
      return {
        ...state,
        selected: undefined
      }
    }
    case IntentDeletedAction: {
      return {
        ...state,
        all: removeAtIndex(state.all, i => i._id === (action as intentDeleted).intent._id)
      }
    }
    default: {
      return state;
    }
  }
};

export type IntentState = { intents: State }

export default { intents: reducer }
