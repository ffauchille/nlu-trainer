import { Reducer } from 'redux';
import { Example } from '../../models/example';
import { IntentExamplesLoadedAction, IntentExamplesLoaded } from '../actions';
import { LoadAppIntentsAction } from '../../intents/actions';
export type State = {
  all: Example[]
  loading: boolean
};

export const defaultState = (): State => ({
  all: [],
  loading: false
});

export const reducer: Reducer<State> = (
  state: State = defaultState(),
  action
): State => {
    switch (action.type) {
      case LoadAppIntentsAction: {
        return { ...state, loading: true }
      }
      case IntentExamplesLoadedAction: {
        return {
          ...state,
          all: (action as IntentExamplesLoaded).examples,
          loading: false
        }
      }
      default: {
        return state;
    }
  }
};

export type ExamplesState = { examples: State }
export default { examples: reducer }