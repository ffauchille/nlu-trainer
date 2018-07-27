import { Epic } from "redux-observable";
import { Actions, LoadAppIntentsAction, LoadAppIntents, appIntentsLoaded, UnselectIntentAction } from "../actions";
import { flatMap, map } from "rxjs/operators";
import * as api from "../../apis"
import { StoreState } from "../../reducers";
import { push } from "react-router-redux";

const loadAppIntentsEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
    action$
       .ofType(LoadAppIntentsAction)
       .pipe(flatMap(a => api.getAppIntents((a as LoadAppIntents).app)))
       .pipe(map(intents => appIntentsLoaded(intents)))

export default [
    loadAppIntentsEpic
]