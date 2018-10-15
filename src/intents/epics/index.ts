import { Epic } from "redux-observable";
import { flatMap, map } from "rxjs/operators";
import * as api from "../../apis";
import { pushTo } from "../../navbar";
import { StoreState } from "../../reducers";
import {
  Actions,
  appEntitiesLoaded,
  categoryIntentsLoaded,
  CreateEntity,
  CreateEntityAction,
  CreateIntent,
  CreateIntentAction,
  DeleteIntent,
  DeleteIntentAction,
  intentDeleted,
  IntentSelected,
  IntentSelectedAction,
  LoadAppEntities,
  loadAppEntities,
  LoadAppEntitiesAction,
  LoadCategoryIntents,
  loadCategoryIntents,
  LoadCategoryIntentsAction
} from "../actions";

const loadCategoryIntentsEpic: Epic<
  Actions,
  Actions,
  StoreState,
  {}
> = action$ =>
  action$
    .ofType(LoadCategoryIntentsAction)
    .pipe(
      flatMap(a => api.getCategoryIntents((a as LoadCategoryIntents).category))
    )
    .pipe(map(intents => categoryIntentsLoaded(intents)));

const loadAppEntitiesEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
  action$
    .ofType(LoadAppEntitiesAction)
    .pipe(flatMap(a => api.getAppEntities((a as LoadAppEntities).app)))
    .pipe(map(entities => appEntitiesLoaded(entities)));

const intentSelectedEpic: Epic<any, any> = action$ =>
  action$
    .ofType(IntentSelectedAction)
    .pipe(map((a: IntentSelected) => pushTo(a.intent, "intent")));

const createIntentEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
  action$.ofType(CreateIntentAction).pipe(
    flatMap<any, any>((a: CreateIntent) => api.createIntent(a.intentCreate)),
    map(created => loadCategoryIntents(created.categoryId))
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
  action$.ofType(CreateEntityAction).pipe(
    flatMap((a: CreateEntity) => api.createEntity(a.entity)),
    map<any, any>(created => loadAppEntities(created.appId))
  );

export default [
  loadCategoryIntentsEpic,
  loadAppEntitiesEpic,
  createIntentEpic,
  createEntityEpic,
  intentSelectedEpic,
  deleteIntentEpic
];
