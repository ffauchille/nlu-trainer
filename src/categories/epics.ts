import { Epic } from "redux-observable";
import { flatMap, map } from "rxjs/operators";
import * as api from "../apis";
import { Category } from "../models/category";
import { pushTo } from "../navbar";
import { categoriesLoaded, CategoriesLoaded, CreateCategoryAction, LoadCategories, loadCategories, LoadCategoriesAction, SelectCategory, SelectCategoryAction, CreateCategory } from "./actions";
import { LoadAppByNameAction, AppSelectedAction, AppSelected } from "../apps/actions";
import { categoryIntentsLoaded, unselectIntent } from "../intents/actions";
import { loadIntentExample } from "../examples/actions";


const loadCategoriesEpic: Epic<any, any> = action$ =>
    action$
       .ofType(LoadCategoriesAction)
       .pipe(
           flatMap((a: LoadCategories) => api.getCategories(a.appId)),
           map<Category[], CategoriesLoaded>(categories => categoriesLoaded(categories))
        )

const createCategoryEpic: Epic<any, any> = action$ =>
    action$
       .ofType(CreateCategoryAction)
       .pipe(
           flatMap((a: CreateCategory) => api.createCategory(a.create)),
           map(created => loadCategories(created.appId))
       )

const pushCategoryRouteEpic: Epic<any, any> = action$ =>
    action$
       .ofType(SelectCategoryAction)
       .pipe(map((a: SelectCategory )=> pushTo(a.category, "category")))

 const unselectIntentOnCategorySelectionEpic: Epic<any, any> = action$ =>
     action$
        .ofType(SelectCategoryAction)
        .pipe(map((a: SelectCategory) => unselectIntent()))

const selectCategoryEpic: Epic<any, any> = action$ =>
    action$
       .ofType(SelectCategoryAction)
       .pipe(
           flatMap((a: SelectCategory) => api.getCategoryIntents(a.category)),
           map(intents => categoryIntentsLoaded(intents))
        )

const loadCategoriesAfterAppSelectedEpic: Epic<any, any> = action$ =>
    action$
       .ofType(AppSelectedAction)
       .pipe(
           flatMap((a: AppSelected) => api.getCategories(a.app._id)),
           map(categories => categoriesLoaded(categories))
        )

export default [
    loadCategoriesEpic,
    createCategoryEpic,
    selectCategoryEpic,
    loadCategoriesAfterAppSelectedEpic,
    pushCategoryRouteEpic,
    unselectIntentOnCategorySelectionEpic
]