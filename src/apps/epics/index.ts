import { Actions, LoadAppsAction, appsLoaded, AppsLoaded } from "../actions"
import { Epic } from "redux-observable"
import * as api from "../../apis"
import { map, flatMap } from "rxjs/operators"
import { AppModel } from "../../models/app";

const loadAppsEpic: Epic<Actions, any> = action$ =>
    action$
       .ofType(LoadAppsAction)
       .lift(flatMap(_ => api.getApps))
       .lift(map<AppModel[], AppsLoaded>(apps => appsLoaded(apps)))

export default [
    loadAppsEpic
]
