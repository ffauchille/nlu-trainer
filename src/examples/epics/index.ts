import { LoadIntentExampleAction, Actions } from "../actions";
import { Epic } from "redux-observable";
import { map } from "rxjs/operators";
import { StoreState } from "../../reducers";

const loadIntentExamplesEpic: Epic<Actions, Actions, StoreState, {}> = action$ =>
    action$
       .ofType(LoadIntentExampleAction)
       .pipe(map(a => a))

export default [
    loadIntentExamplesEpic
]