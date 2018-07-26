import { Action } from "redux";

export type LoadIntents = Action<string> & {}
export const loadIntentsAction = "intents#loadIntents"

export function loadIntents(): LoadIntents {
    return { type: loadIntentsAction }
}