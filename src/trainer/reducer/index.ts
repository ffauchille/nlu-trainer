import { Reducer } from 'redux'
import * as actions from './actions'
import { Intent } from '../../models/Intent';

export type State = {
    intents: Intent[]
};

export const defaultState = (): State => ({
    intents: []
});

function onSomething(state: State, i: actions.Something): State {
return { ...state, }
}

function onSomethingElse(state: State, i: actions.SomethingElse): State {
return { ...state, }
}

export const reducer: Reducer<State> = (
state: State = defaultState(),
  action: actions.AllActionTypes
): State => {
    switch (action){
        case 
    }
}