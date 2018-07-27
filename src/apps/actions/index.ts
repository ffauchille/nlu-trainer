import { Action } from "redux";
import { AppModel } from "../../models/app";

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


export type Actions = 
    | LoadApps 
    | AppsLoaded
    | AppSelected
    | UnselectApp