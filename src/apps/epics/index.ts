import * as api from "../../apis"
import { Actions, LoadAppsAction, appsLoaded, AppsLoaded, AppSelectedAction, AppSelected, CreateAppAction, CreateApp, appCreated, loadApps } from "../actions"
import { Epic } from "redux-observable"
import { map, flatMap } from "rxjs/operators"
import { AppModel } from "../../models/app";
import { push } from "connected-react-router";
import { urlify } from "../../utils";
import { StoreState } from "../../reducers";

const loadAppsEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
    action$
       .ofType(LoadAppsAction)
       .pipe(flatMap(_ => api.getApps()))
       .pipe(map<AppModel[], AppsLoaded>(apps => appsLoaded(apps)))

const appSelectedEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
    action$
       .ofType(AppSelectedAction)
       .pipe(map(a => push(`/apps/${urlify((a as AppSelected).app.name)}`, "router")))

const createAppEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
  action$
    .ofType(CreateAppAction)
    .pipe(flatMap(a => api.createApp((a as CreateApp).appCreate)))
    .pipe(map(_ => loadApps()))

export default [
    loadAppsEpic,
    appSelectedEpic,
    createAppEpic
]
