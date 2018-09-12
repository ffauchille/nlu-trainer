import { Reducer } from "redux";
import { AppIntentsLoadedAction, AppIntentsLoaded, UnselectIntentAction, IntentSelectedAction, IntentSelected, IntentDeleted, IntentDeletedAction, AppEntitiesLoadedAction, AppEntitiesLoaded } from "../actions";
import { Intent } from "../../models/intent";
import { removeAtIndex } from "../../utils";
import { Entity } from "../../models/entity";

type State = {
  all: Intent[],
  entities: Entity[],
  selected?: Intent
};

export const defaultState = (): State => ({
  all: [],
  entities: []
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
    case AppEntitiesLoadedAction: {
      return {
        ...state,
        entities: (action as AppEntitiesLoaded).entities
      }
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
        all: removeAtIndex(state.all, i => i._id === (action as IntentDeleted).intent._id)
      }
    }
    default: {
      return state;
    }
  }
};

export type IntentState = { intents: State }

export default { intents: reducer }
