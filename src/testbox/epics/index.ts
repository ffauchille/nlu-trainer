import { Epic } from "redux-observable";
import { flatMap, map } from "rxjs/operators";

import * as api from "../../apis"
import { PredictAction, Predict, prediction } from "../actions";
import { StoreState } from "../../reducers";
import { StoreActions } from "../../actions";

const predictEpic: Epic<StoreActions, StoreActions, StoreState, {}> = action$ =>
  action$
    .ofType(PredictAction)
    .pipe(flatMap<any, any>((a: Predict) => api.predict(a.app, a.text).pipe(map( result => prediction(a.app, result ))) ))


export default [
    predictEpic
]