import { Epic } from "redux-observable";
import { Actions, LoadAppIntentsAction, LoadAppIntents, appIntentsLoaded, CreateIntentAction, CreateIntent, loadAppIntents, IntentSelectedAction, IntentSelected } from "../actions";
import { flatMap, map } from "rxjs/operators";
import * as api from "../../apis"
import { StoreState } from "../../reducers";
import { AppModel } from "../../models/app";
import { push } from "connected-react-router";
import { urlify } from "../../utils";

const loadAppIntentsEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
    action$
       .ofType(LoadAppIntentsAction)
       .pipe(flatMap(a => api.getAppIntents((a as LoadAppIntents).app)))
       .pipe(map(intents => appIntentsLoaded(intents)))

const intentSelectedEpic: Epic<Actions, Actions, StoreState, {}> = (action$, store$) =>
  action$
    .ofType(IntentSelectedAction)
    .pipe(map(a => push(`/apps/${urlify((store$.value.apps.selected || { name: 'intent'}).name)}/${urlify((a as IntentSelected).intent.name)}`)))

const createIntentEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
  action$
    .ofType(CreateIntentAction)
    .pipe(flatMap<any, any>((a: CreateIntent) => api.createIntent(a.intentCreate)
            .pipe(map(_ => loadAppIntents(a.intentCreate.appId || "")))))

export default [
    loadAppIntentsEpic,
    createIntentEpic,
    intentSelectedEpic
]