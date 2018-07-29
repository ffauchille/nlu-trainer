import { LoadIntentExampleAction, Actions, intentExamplesLoaded, LoadIntentExample, CreateExampleAction, CreateExample, loadIntentExample } from "../actions";
import { Epic } from "redux-observable";
import { map, flatMap } from "rxjs/operators";
import { StoreState } from "../../reducers";
import * as api from "../../apis";
import { Intent } from "../../models/intent";

const loadIntentExamplesEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
    action$
       .ofType(LoadIntentExampleAction)
       .pipe(flatMap<any, any>((a: LoadIntentExample) => api.getIntentExamples(a.intent)))
       .pipe(map(examples => intentExamplesLoaded(examples)))

const createExampleEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
  action$
    .ofType(CreateExampleAction)
    .pipe(flatMap<any, any>((a: CreateExample) => api.createExample(a.example)
        .pipe(map(_ => loadIntentExample(a.example.intent || ""))))
    )
    

export default [
    loadIntentExamplesEpic,
    createExampleEpic
]