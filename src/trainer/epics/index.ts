import { Actions, LoadUtterances } from "../actions"
import { Epic } from "redux-observable"
import * as api from "../../apis"
import { map } from "rxjs/operators"

const loadUtterancesEpics: Epic<Actions, any> = action$ =>
    action$
        .ofType(LoadUtterances)
        .lift(map(a => a))

export default [
    loadUtterancesEpics
]
