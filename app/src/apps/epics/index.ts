import * as api from "../../apis";
import {
  Actions,
  LoadAppsAction,
  appsLoaded,
  AppsLoaded,
  AppSelectedAction,
  AppSelected,
  CreateAppAction,
  CreateApp,
  loadApps,
  StartAppTrainingAction,
  StartAppTraining,
  appTrained,
  DeleteAppAction,
  DeleteApp,
  appDeleted,
} from "../actions";
import { TestAppAction,TestApp } from "../../testbox/actions"
import { Epic } from "redux-observable";
import { map, flatMap } from "rxjs/operators";
import { AppModel } from "../../models/app";
import { push } from "connected-react-router";
import { urlify } from "../../utils";
import { StoreState } from "../../reducers";
import { Action } from "redux";

const loadAppsEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
  action$
    .ofType(LoadAppsAction)
    .pipe(flatMap(_ => api.getApps()))
    .pipe(map<AppModel[], AppsLoaded>(apps => appsLoaded(apps)));

const appSelectedEpic: Epic<
  Actions | Action,
  Actions | Action,
  StoreState,
  {}
> = action$ =>
  action$
    .ofType(AppSelectedAction)
    .pipe(map<any, any>((a: AppSelected) => push(`/${urlify(a.app.name)}`)));

const testAppEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
  action$
    .ofType(TestAppAction)
    .pipe(
      map<any, any>((a: TestApp) => push(`/testbox/${urlify(a.app.name)}`))
    );

const createAppEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
  action$
    .ofType(CreateAppAction)
    .pipe(flatMap(a => api.createApp((a as CreateApp).appCreate)))
    .pipe(map(_ => loadApps()));

const startAppTrainingEpic: Epic<Actions, any> = action$ =>
  action$
    .ofType(StartAppTrainingAction)
    .pipe(
      flatMap<any, any>((a: StartAppTraining) =>
        api.trainApp(a.app).pipe(map(_ => a.app))
      )
    )
    .pipe(map(app => appTrained(app)));

const deleteAppEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
  action$
    .ofType(DeleteAppAction)
    .pipe(
      flatMap<any, any>((a: DeleteApp) =>
        api.deleteApp(a.app).pipe(map(_ => appDeleted(a.app)))
      )
    );

export default [
  loadAppsEpic,
  appSelectedEpic,
  testAppEpic,
  createAppEpic,
  startAppTrainingEpic,
  deleteAppEpic
];
