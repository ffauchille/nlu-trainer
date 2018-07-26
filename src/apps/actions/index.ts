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

export type Actions = 
    | LoadApps 
    | AppsLoaded