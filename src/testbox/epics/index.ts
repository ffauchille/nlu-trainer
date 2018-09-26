import { Epic } from "redux-observable";
import { flatMap, map } from "rxjs/operators";

import * as api from "../../apis";
import {
  PredictAction,
  Predict,
  prediction,
  CreateTestSuiteAction,
  CreateTestSuite,
  UploadCSVAction,
  UploadCSV,
  csvUploaded
} from "../actions";
import { StoreState } from "../../reducers";
import { StoreActions } from "../../actions";

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

const createTestSuiteEpic: Epic<
  StoreActions,
  StoreActions,
  StoreState,
  {}
> = action$ =>
  action$
    .ofType(CreateTestSuiteAction)
    .pipe(
      flatMap<any, any>((a: CreateTestSuite) => api.createTestSuite(a.creation))
    );

const uploadCSVEpic: Epic<any, any> = action$ =>
  action$.ofType(UploadCSVAction).pipe(
    flatMap((a: UploadCSV) => api.uploadCSVFile(a.data)),
    map(_ => csvUploaded())
  );

export default [predictEpic, createTestSuiteEpic, uploadCSVEpic];
