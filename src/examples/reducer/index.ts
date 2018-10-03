import { Reducer } from 'redux';
import { Example } from '../../models/example';
import { IntentExamplesLoadedAction, IntentExamplesLoaded, ExampleDeletedAction, ExampleDeleted } from '../actions';
import { LoadCategoryIntentsAction } from '../../intents/actions';
import { removeAtIndex } from '../../utils';
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
      case LoadCategoryIntentsAction: {
        return { ...state, loading: true }
      }
      case IntentExamplesLoadedAction: {
        return {
          ...state,
          all: (action as IntentExamplesLoaded).examples,
          loading: false
        }
      }
      case ExampleDeletedAction: {
        return {
          ...state,
          all: removeAtIndex(state.all, e => e._id === (action as ExampleDeleted).example._id)
        }
      }
      default: {
        return state;
    }
  }
};

export type ExamplesState = { examples: State }
export default { examples: reducer }