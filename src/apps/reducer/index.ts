import { Reducer } from 'redux'
import { Actions, AppsLoadedAction, AppsLoaded, AppSelectedAction, AppSelected, LoadAppsAction, UnselectAppAction, AppCreatedAction, AppCreated } from '../actions'
import { AppModel } from '../../models/app';

type State = {
    all: AppModel[]
    selected?: AppModel
};

export const defaultState = (): State => ({
    all: []
});

export const reducer: Reducer<State> = (
state: State = defaultState(),
  action
): State => {
    switch(action.type) {
        case AppsLoadedAction: {
            return {
                ...state,
                all: (action as AppsLoaded).apps
            }
        }
        case AppSelectedAction: {
            return {
                ...state,
                selected: (action as AppSelected).app
            }
        }
        case UnselectAppAction: {
            return {
                ...state,
                selected: undefined
            }
        }
        default:
            return state
    }
}

export type AppsState = { apps: State }
export default { apps: reducer }