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
  AppTrained,
  AppDeletedAction,
  AppDeleted
} from "../actions";
import { AppModel, AppStatus } from "../../models/app";
import { removeAtIndex, findAllAndUpdate, normalize } from "../../utils";
import { RasaStatusUpdatedAction, RasaStatusUpdated } from "../actions/rasa";

type State = {
  all: AppModel[];
  statuses: AppStatus[];
  selected?: AppModel;
  onTraining: AppModel[];
};

export const defaultState = (): State => ({
  all: [],
  onTraining: [],
  statuses: []
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
      return {
        ...state,
        onTraining: state.onTraining.concat((action as StartAppTraining).app)
      };
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
    case RasaStatusUpdatedAction: {
      let statusUpdates = (action as RasaStatusUpdated).status.available_projects
      let appsToBeUpdate = (state.all.filter(app => normalize(app.name) in statusUpdates))
      return {
        ...state,
        statuses: appsToBeUpdate.map(a => ({ app: a, status: (statusUpdates[normalize(a.name)]).status }))
      }
    }
    case AppDeletedAction:{
      return {
        ...state,
        all: removeAtIndex(state.all, app => app._id === (action as AppDeleted).app._id)
      }
    }
    default:
      return state;
  }
};

export type AppsState = { apps: State };
export default { apps: reducer };
