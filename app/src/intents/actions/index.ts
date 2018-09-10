import { Action } from "redux";
import { AppModel } from "../../models/app";
import { Intent } from "../../models/intent";


export type LoadAppIntents = Action<string> & {
    app: AppModel | string
}
export const LoadAppIntentsAction = "intents#LoadAppIntents"
export function loadAppIntents(app: AppModel | string): LoadAppIntents {
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

export type CreateIntent = Action<string> & {
    intentCreate: Partial<Intent>;
}
export const CreateIntentAction = "intents#CreateIntent"
export function createIntent(intentCreate: Partial<Intent>): CreateIntent {
    return { type: CreateIntentAction, intentCreate }
}

export type UpdateIntent = Action<string> & {
    intentUpdated: Intent
}
export const UpdateIntentAction = "intents#UpdateIntent"
export function updateIntent(intentUpdated: Intent): UpdateIntent {
    return { type: UpdateIntentAction, intentUpdated }
}

export type IntentSelected = Action<string> & {
    intent: Intent
}
export const IntentSelectedAction = "intents#IntentSelected"
export function intentSelected(intent: Intent): IntentSelected {
    return { type: IntentSelectedAction, intent }
}

export type DeleteIntent = Action<string> & { intent: Intent }
export const DeleteIntentAction = "intents#DeleteIntent"
export function deleteIntent(intent: Intent): DeleteIntent {
    return { type: DeleteIntentAction, intent }
}

export type intentDeleted = Action<string> & { intent: Intent }
export const IntentDeletedAction = "intents#IntentDeleted"
export function intentDeleted( intent: Intent ): intentDeleted {
    return { type: IntentDeletedAction, intent }
}

export type Actions =
    | LoadAppIntents 
    | AppIntentsLoaded
    | UnselectIntent
    | CreateIntent
    | UpdateIntent
    | IntentSelected
    | DeleteIntent
    | intentDeleted