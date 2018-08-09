import { Reducer } from 'redux';
import { AppModel } from '../../models/app';
import { TestAppAction, TestApp, PredictionAction, Prediction, PredictAction, Predict } from '../actions';
import { UnselectAppAction } from '../../apps/actions';

type IntentScore = {
    name: string;
    confidence: number;
}
export type PredictionResult = {
  intent: IntentScore;
  entities: any[];
  intent_ranking: IntentScore[];
  text: string;
  project: string; /** RASA Project name === the app's name normalized */
  model: string; /** RASA Model version use for the prediction */
}
export type ChatMessage = {
    type: 'predict' | 'prediction';
    text: string;
    score?: number;
};

type LiveState = {
    messageLog: ChatMessage[];
    predicting: boolean;
}
type State = {
    app?: AppModel;
    live: LiveState;
}
const defaultState: State = {
    live: {
        messageLog: [],
        predicting: false
    }
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
    case PredictAction: {
        let predictMessage: ChatMessage = { 
            type: 'predict',
            text: (action as Predict).text
        }
        return { 
            ...state,
            live: {
                ...state.live,
                messageLog: [ ...state.live.messageLog, predictMessage ],
                predicting: true
            }
        }
    }
    case PredictionAction: {
        let prediction = (action as Prediction).prediction
        let predictionMessage: ChatMessage = {
            type: 'prediction',
            text: prediction.intent.name,
            score: prediction.intent.confidence
        }
        return {
            ...state,
            live: {
                ...state.live,
                messageLog: [ ...state.live.messageLog, predictionMessage],
                predicting: false
            }
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