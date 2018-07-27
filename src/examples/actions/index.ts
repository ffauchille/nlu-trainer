import { Action } from "redux";
import { Intent } from "../../models/Intent";
import { NLUExample } from "../../models/example";

export type LoadIntentExample = Action<string> & { intent: Intent }
export const LoadIntentExampleAction = "examples#LoadIntentExample"
export function loadIntentExample(intent: Intent): LoadIntentExample {
    return { type: LoadIntentExampleAction, intent }
}

export type IntentExamplesLoaded = Action<string> & {
    examples: NLUExample[]
}
export const IntentExamplesLoadedAction = "examples#IntentExamplesLoaded"
export function intentExamplesLoaded(examples: NLUExample[]): IntentExamplesLoaded {
    return { type: IntentExamplesLoadedAction, examples }
}


export type Actions = 
    | LoadIntentExample
    | IntentExamplesLoaded