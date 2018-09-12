import { Epic } from "redux-observable";
import {
  Actions,
  LoadAppIntentsAction,
  LoadAppIntents,
  appIntentsLoaded,
  CreateIntentAction,
  CreateIntent,
  loadAppIntents,
  IntentSelectedAction,
  IntentSelected,
  DeleteIntentAction,
  DeleteIntent,
  intentDeleted,
  CreateEntityAction,
  CreateEntity,
  LoadAppEntitiesAction,
  LoadAppEntities,
  appEntitiesLoaded,
  loadAppEntities
} from "../actions";
import { flatMap, map } from "rxjs/operators";
import * as api from "../../apis";
import { StoreState } from "../../reducers";
import { push } from "connected-react-router";
import { urlify } from "../../utils";

const loadAppIntentsEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
  action$
    .ofType(LoadAppIntentsAction)
    .pipe(flatMap(a => api.getAppIntents((a as LoadAppIntents).app)))
    .pipe(map(intents => appIntentsLoaded(intents)));

 
const loadAppEntitiesEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
  action$
    .ofType(LoadAppEntitiesAction)
    .pipe(flatMap(a => api.getAppEntities((a as LoadAppEntities).app)))
    .pipe(map(entities => appEntitiesLoaded(entities)));

 

const intentSelectedEpic: Epic<Actions, Actions, StoreState, {}> = (
  action$,
  store$
) =>
  action$
    .ofType(IntentSelectedAction)
    .pipe(
      map(a =>
        push(
          `/${urlify(
            (store$.value.apps.selected || { name: "intent" }).name
          )}/${urlify((a as IntentSelected).intent.name)}`
        )
      )
    );

const createIntentEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
  action$
    .ofType(CreateIntentAction)
    .pipe(
      flatMap<any, any>((a: CreateIntent) =>
        api
          .createIntent(a.intentCreate)
          .pipe(map(_ => loadAppIntents(a.intentCreate.appId || "")))
      )
    );

const deleteIntentEpic: Epic<Actions, any> = action$ =>
  action$
    .ofType(DeleteIntentAction)
    .pipe(
      flatMap<any, any>((a: DeleteIntent) =>
        api.deleteIntent(a.intent).pipe(map(_ => intentDeleted(a.intent)))
      )
    );

const createEntityEpic = action$ =>
    action$
       .ofType(CreateEntityAction)
       .pipe(
         flatMap((a: CreateEntity) => api.createEntity(a.entity)),
         map<any, any>(created => loadAppEntities(created.appId))
       )

export default [
  loadAppIntentsEpic,
  loadAppEntitiesEpic,
  createIntentEpic,
  createEntityEpic,
  intentSelectedEpic,
  deleteIntentEpic
];
