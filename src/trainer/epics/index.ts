import { Actions, LoadUtterances } from "../actions"
import { Epic } from "redux-observable"
import * as api from "../../apis"

export const loadUtterancesEpics: Epic<Actions, any> = action$ =>
    action$
        .ofType(LoadUtterances)