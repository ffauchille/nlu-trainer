import { Reducer } from 'redux';
import { AppModel } from '../../models/app';
import { TestAppAction, TestApp } from '../actions';
import { UnselectAppAction } from '../../apps/actions';

type State = {
    app?: AppModel
}
const defaultState: State = {
    
};

export const reducer: Reducer<State> = (
  state: State = defaultState,
  action
) => {
  switch (action.type) {
    case TestAppAction: {
        return {
            ...state,
            app: (action as TestApp).app
        }
    }
    case UnselectAppAction: {
        return {
            ...state,
            app: undefined
        }
    }
    default:
      return state;
  }
};

export type TestBoxState = {
  testbox: State
};

export default { testbox: reducer };