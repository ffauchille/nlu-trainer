import * as api from "../../apis"
import { Actions, LoadAppsAction, appsLoaded, AppsLoaded, AppSelectedAction, AppSelected } from "../actions"
import { Epic } from "redux-observable"
import { map, flatMap } from "rxjs/operators"
import { AppModel } from "../../models/app";
import { Store } from "redux";
import { push } from "react-router-redux";
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

export default [
    loadAppsEpic,
    appSelectedEpic
]
