import { Reducer } from 'redux'
import { Actions, LoadAppsAction, AppsLoadedAction, AppsLoaded } from '../actions'
import { AppModel } from '../../models/app';

export type State = {
    all: AppModel[]
};

export const defaultState = (): State => ({
    all: []
});

export const reducer: Reducer<State> = (
state: State = defaultState(),
  action: Actions
): State => {
    switch(action.type) {
        case AppsLoadedAction: {
            return {
                ...state,
                all: (action as AppsLoaded).apps
            }
        }
        default:
            return state
    }
  }