import { Epic } from "redux-observable";
import { flatMap, map } from "rxjs/operators";
import * as api from "../apis";
import { AppSelected, AppSelectedAction } from "../apps/actions";
import {
  IntentExamplesLoadedAction,
  LoadIntentExampleAction
} from "../examples/actions";
import {
  categoryIntentsLoaded,
  CategoryIntentsLoaded,
  CategoryIntentsLoadedAction,
  LoadCategoryIntentsAction,
  unselectIntent
} from "../intents/actions";
import { Category } from "../models/category";
import { pushTo } from "../navbar";
import {
  categoriesLoaded,
  CategoriesLoaded,
  CreateCategory,
  CreateCategoryAction,
  LoadCategories,
  loadCategories,
  LoadCategoriesAction,
  SelectCategory,
  SelectCategoryAction,
  startContentLoader,
  stopContentLoader
} from "./actions";

const loadCategoriesEpic: Epic<any, any> = action$ =>
  action$.ofType(LoadCategoriesAction).pipe(
    flatMap((a: LoadCategories) => api.getCategories(a.appId)),
    map<Category[], CategoriesLoaded>(categories =>
      categoriesLoaded(categories)
    )
  );

const createCategoryEpic: Epic<any, any> = action$ =>
  action$.ofType(CreateCategoryAction).pipe(
    flatMap((a: CreateCategory) => api.createCategory(a.create)),
    map(created => loadCategories(created.appId))
  );

const pushCategoryRouteEpic: Epic<any, any> = action$ =>
  action$
    .ofType(SelectCategoryAction)
    .pipe(map((a: SelectCategory) => pushTo(a.category, "category")));

const unselectIntentOnCategorySelectionEpic: Epic<any, any> = action$ =>
  action$
    .ofType(SelectCategoryAction)
    .pipe(map((a: SelectCategory) => unselectIntent()));

const selectCategoryEpic: Epic<any, any> = action$ =>
  action$.ofType(SelectCategoryAction).pipe(
    flatMap((a: SelectCategory) => api.getCategoryIntents(a.category)),
    map(intents => categoryIntentsLoaded(intents))
  );

const startContentLoaderEpic: Epic<any, any> = action$ =>
  action$
    .ofType(SelectCategoryAction, LoadCategoryIntentsAction, LoadIntentExampleAction)
    .pipe(map(_ => startContentLoader()));

const stopContentLoaderEpic: Epic<any, any> = action$ =>
  action$
    .ofType(CategoryIntentsLoadedAction, IntentExamplesLoadedAction)
    .pipe(map(_ => stopContentLoader()));

const loadCategoriesAfterAppSelectedEpic: Epic<any, any> = action$ =>
  action$.ofType(AppSelectedAction).pipe(
    flatMap((a: AppSelected) => api.getCategories(a.app._id)),
    map(categories => categoriesLoaded(categories))
  );

export default [
  loadCategoriesEpic,
  createCategoryEpic,
  selectCategoryEpic,
  loadCategoriesAfterAppSelectedEpic,
  pushCategoryRouteEpic,
  unselectIntentOnCategorySelectionEpic,
  startContentLoaderEpic,
  stopContentLoaderEpic
];
