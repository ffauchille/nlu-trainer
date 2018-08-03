import { Action } from "redux";
import { AppModel } from "../../models/app";
import { RasaStatusUpdated } from "./rasa";

export type LoadApps = Action<string>
export const LoadAppsAction = "apps#loadApps"
export function loadApps(): LoadApps {
    return { type: LoadAppsAction }
}

export type AppsLoaded = Action<string> & {
    apps: AppModel[];
}
export const AppsLoadedAction = "apps#AppsLoaded"
export function appsLoaded(apps: AppModel[]): AppsLoaded {
    return { type: AppsLoadedAction, apps }
}

export const AppSelectedAction = "apps#appSelected"
export type AppSelected = Action<string> & { app: AppModel }


export function appSelected(app: AppModel): AppSelected {
    return { type: AppSelectedAction, app }
}

export type UnselectApp = Action<string> & {}
export const UnselectAppAction = "apps#UnselectApp"
export function unselectApp(): UnselectApp {
    return { type: UnselectAppAction }
}

export type CreateApp = Action<string> & {
    appCreate: Partial<AppModel>
}
export const CreateAppAction = "apps#CreateApp"
export function createApp(appCreate: Partial<AppModel>): CreateApp {
    return { type: CreateAppAction, appCreate }
}

export type AppCreated = Action<string> & {
    app: AppModel
}
export const AppCreatedAction = "apps#AppCreated"
export function appCreated(app: AppModel): AppCreated {
    return { type: AppCreatedAction, app }
}

export type UpdateApp = Action<string> & {
    appUpdated: AppModel
}
export const UpdateAppAction = "apps#UpdateApp"
export function updateApp(appUpdated: AppModel): UpdateApp {
    return { type: UpdateAppAction, appUpdated }
}

export type AppUpdated = Action<string> & {}
export const AppUpdatedAction = "aps#AppUpdated"
export function appUpdated(): AppUpdated {
    return { type: AppUpdatedAction }
}

export type StartAppTraining = Action<string> & { app: AppModel}
export const StartAppTrainingAction = "apps#StartAppTraining"
export function startAppTraining(app: AppModel): StartAppTraining {
    return { type: StartAppTrainingAction, app }
}

export type AppTrained = Action<string> & {
    app: AppModel
}
export const AppTrainedAction = "apps#AppTrained"
export function appTrained(app: AppModel): AppTrained {
    return { type: AppTrainedAction, app }
}

export type Actions = 
    | LoadApps
    | AppsLoaded
    | AppSelected
    | UnselectApp
    | CreateApp
    | AppCreated
    | UpdateApp
    | AppUpdated
    | StartAppTraining
    | RasaStatusUpdated