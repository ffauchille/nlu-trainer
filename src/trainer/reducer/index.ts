import { Reducer } from 'redux'
import * as actions from '../actions'
import { Intent } from '../../models/Intent';

export type State = {
    intents: Intent[]
};

export const defaultState = (): State => ({
    intents: []
});

export const reducer: Reducer<State> = (
state: State = defaultState(),
  action: actions.Actions
): State => {
    switch (action.type){
        case actions.LoadUtterances:{
            return state
        }
        default:
            return state
    }
}