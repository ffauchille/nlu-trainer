import { Action } from "redux";
import { AppModel } from "../../models/app";
import { Intent } from "../../models/Intent";


export type LoadAppIntents = Action<string> & {
    app: AppModel
}
export const LoadAppIntentsAction = "intents#LoadAppIntents"
export function loadAppIntents(app: AppModel): LoadAppIntents {
    return { type: LoadAppIntentsAction, app }
}

export type AppIntentsLoaded = Action<string> & {
    intents: Intent[]
}
export const AppIntentsLoadedAction = "intents#AppIntentsLoaded"
export function appIntentsLoaded(intents: Intent[]): AppIntentsLoaded {
    return { type: AppIntentsLoadedAction, intents }
}

export type UnselectIntent = Action<string> & {}
export const UnselectIntentAction = "intents#UnselectIntent"
export function unselectIntent(): UnselectIntent {
    return { type: UnselectIntentAction }
}

export type Actions =
    | LoadAppIntents 
    | AppIntentsLoaded
    | UnselectIntent