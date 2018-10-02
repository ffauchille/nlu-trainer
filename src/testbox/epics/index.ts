import { Epic } from "redux-observable";
import { flatMap, map, tap } from "rxjs/operators";

import * as api from "../../apis";
import {
  PredictAction,
  Predict,
  prediction,
  CreateTestSuiteAction,
  CreateTestSuite,
  LoadTestSuitesAction,
  loadTestSuites,
  LoadTestSuites,
  testSuiteLoaded,
  StartTestSuiteEvaluationAction,
  StartTestSuiteEvaluation,
  testSuiteEvaluated,
  UploadCSVAction,
  UploadCSV,
  selectSuiteForEvaluation
} from "../actions";
import { StoreState } from "../../reducers";
import { StoreActions } from "../../actions";
import { store } from "../../app";

const predictEpic: Epic<StoreActions, StoreActions, StoreState, {}> = action$ =>
  action$
    .ofType(PredictAction)
    .pipe(
      flatMap<any, any>((a: Predict) =>
        api
          .predict(a.app, a.text)
          .pipe(map(result => prediction(a.app, result)))
      )
    );

const loadTestSuitesEpic: Epic<any, any> = action$ =>
  action$.ofType(LoadTestSuitesAction).pipe(
    flatMap((a: LoadTestSuites) => api.getAppTestSuites(a.appId)),
    map(loaded => testSuiteLoaded(loaded))
  );

const startTestSuiteEvaluationEpic: Epic<any, any> = action$ =>
  action$.ofType(StartTestSuiteEvaluationAction).pipe(
    flatMap((a: StartTestSuiteEvaluation) => api.evaluateTestSuite(a.suite)),
    map(evaluation => testSuiteEvaluated(evaluation))
  );

const uploadCSVEpic: Epic<any, any> = action$ =>
  action$.ofType(UploadCSVAction).pipe(
    flatMap((a: UploadCSV) => api.uploadCSVTrainings$(a.file, a.testSuiteId)),
    map(suite => selectSuiteForEvaluation(suite))
  );

const createTestSuiteEpic: Epic<
  StoreActions,
  StoreActions,
  StoreState,
  {}
> = action$ =>
  action$.ofType(CreateTestSuiteAction).pipe(
    flatMap<any, any>((a: CreateTestSuite) => api.createTestSuite(a.creation)),
    map(created => loadTestSuites(created))
  );

export default [
  predictEpic,
  createTestSuiteEpic,
  loadTestSuitesEpic,
  startTestSuiteEvaluationEpic,
  uploadCSVEpic
];
