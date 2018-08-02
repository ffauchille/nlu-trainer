import { Reducer } from "redux";
import {
  AppsLoadedAction,
  AppsLoaded,
  AppSelectedAction,
  AppSelected,
  UnselectAppAction,
  StartAppTrainingAction,
  StartAppTraining,
  AppTrainedAction,
  AppTrained
} from "../actions";
import { AppModel } from "../../models/app";
import { removeAtIndex } from "../../utils";

type State = {
  all: AppModel[];
  selected?: AppModel;
  onTraining: AppModel[];
};

export const defaultState = (): State => ({
  all: [],
  onTraining: []
});

export const reducer: Reducer<State> = (
  state: State = defaultState(),
  action
): State => {
  switch (action.type) {
    case AppsLoadedAction: {
      return {
        ...state,
        all: (action as AppsLoaded).apps
      };
    }
    case AppSelectedAction: {
      return {
        ...state,
        selected: (action as AppSelected).app
      };
    }
    case StartAppTrainingAction: {
      state.onTraining.push((action as StartAppTraining).app);
      return state;
    }
    case AppTrainedAction: {
      return {
        ...state,
        onTraining: removeAtIndex(
          state.onTraining,
          a => a._id === (action as AppTrained).app._id
        )
      };
    }
    case UnselectAppAction: {
      return {
        ...state,
        selected: undefined
      };
    }
    default:
      return state;
  }
};

export type AppsState = { apps: State };
export default { apps: reducer };
