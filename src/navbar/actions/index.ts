import { Action } from "redux";

export type appSelected = Action<string> & {
}

export const appSelectedAction = "navbar#appSelected"

export function functionName(): appSelected {
    return { type: appSelectedAction }
}