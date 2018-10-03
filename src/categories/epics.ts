import { Epic } from "redux-observable";
import { flatMap, map } from "rxjs/operators";
import { LoadCategoriesAction, CreateCategoryAction, LoadCategories } from "./actions";

import * as api from "../apis"

const loadCategoriesEpic: Epic<any, any> = action$ =>
    action$
       .ofType(LoadCategoriesAction)
       .pipe(flatMap((a: LoadCategories) => api.getCategories))

const createCategoryEpic: Epic<any, any> = action$ =>
    action$
       .ofType(CreateCategoryAction)
       .pipe(map(a => a))

export default [
    loadCategoriesEpic,
    createCategoryEpic
]