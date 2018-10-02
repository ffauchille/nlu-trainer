import { Reducer } from 'redux';
import { AppModel } from '../../models/app';
import { TestAppAction, TestApp, PredictionAction, Prediction, PredictAction, Predict, UploadCSVAction, CSVUploadedAction, LoadTestSuitesAction, TestSuitesLoadedAction, TestSuitesLoaded, SelectSuiteForEvaluationAction, SelectSuiteForEvaluation, CloseTestSuiteEvaluationAction, TestSuiteEvaluatedAction, TestSuiteEvaluated, StartTestSuiteEvaluationAction } from '../actions';
import { UnselectAppAction } from '../../apps/actions';
import { TestSuite, TestSuiteEvaluation } from '../../models/testsuite';

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

type BatchState = {
    uploadingCSV: boolean,
    suites: TestSuite[],
    processingEvaluation: boolean,
    suiteSelected?: TestSuite
    evaluation?: TestSuiteEvaluation
}

type State = {
    app?: AppModel;
    live: LiveState;
    batch: BatchState;
}
const defaultState: State = {
    live: {
        messageLog: [],
        predicting: false
    },
    batch: {
        uploadingCSV: false,
        suites: [],
        processingEvaluation: false
    }
};

export const reducer: Reducer<State> = (
  state: State = defaultState,
  action
) => {
  switch (action.type) {
    case LoadTestSuitesAction: {
        return {
            ...state,
            batch: {
                ...state.batch,
                loadingSuites: true
            }
        }
    }
    case TestSuitesLoadedAction: {
        return {
            ...state,
            batch: {
                ...state.batch,
                loadingSuites: false,
                suites: (action as TestSuitesLoaded).suites
            }
        }
    }
    case StartTestSuiteEvaluationAction: {
        return {
            ...state,
            batch: {
                ...state.batch,
                processingEvaluation: true
            }
        }
    }
    case TestSuiteEvaluatedAction: {
        return {
            ...state,
            batch: {
                ...state.batch,
                evaluation: (action as TestSuiteEvaluated).result,
                processingEvaluation: false
            }
        }
    }
    case SelectSuiteForEvaluationAction: {
        return {
            ...state,
            batch: {
                ...state.batch,
                suiteSelected: (action as SelectSuiteForEvaluation).suite
            }
        }
    }
    case CloseTestSuiteEvaluationAction: {
        return {
            ...state,
            batch: {
                ...state.batch,
                suiteSelected: undefined
            }
        }
    }
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
    case UploadCSVAction: {
        return {
            ...state,
            batch: {
                ...state.batch,
                uploadingCSV: true
            }
        }
    }
    case CSVUploadedAction: {
        return {
            ...state,
            batch: {
                ...state.batch,
                uploadingCSV: false
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