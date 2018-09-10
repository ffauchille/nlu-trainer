import { Action } from "redux";
import { Intent } from "../../models/intent";
import { Example } from "../../models/example";

export type LoadIntentExample = Action<string> & { intent: Intent | string }
export const LoadIntentExampleAction = "examples#LoadIntentExample"
export function loadIntentExample(intent: Intent | string): LoadIntentExample {
    return { type: LoadIntentExampleAction, intent }
}

export type IntentExamplesLoaded = Action<string> & {
    examples: Example[]
}
export const IntentExamplesLoadedAction = "examples#IntentExamplesLoaded"
export function intentExamplesLoaded(examples: Example[]): IntentExamplesLoaded {
    return { type: IntentExamplesLoadedAction, examples }
}

export type CreateExample = Action<string> & { example: Partial<Example> }
export const CreateExampleAction = "examples#CreateExample"
export function createExample(example: Partial<Example>): CreateExample {
    return { type: CreateExampleAction, example }
}

export type UpdateExample = Action<string> & { example: Example }
export const UpdateExampleAction = "examples#UpdateExample"
export function updateExample(example: Example): UpdateExample {
    return { type: UpdateExampleAction, example }
}

export type DeleteExample = Action<string> & { example: Example }
export const DeleteExampleAction = "example#DeleteExample"
export function deleteExample(example: Example): DeleteExample {
    return { type: DeleteExampleAction, example }
}

export type ExampleDeleted = Action<string> & { example: Example }
export const ExampleDeletedAction = "example#ExampleDeleted"
export function exampleDeleted(example: Example): ExampleDeleted {
    return { type: ExampleDeletedAction, example }
}

export type Actions = 
    | LoadIntentExample
    | IntentExamplesLoaded
    | CreateExample
    | UpdateExample
    | DeleteExample
    | ExampleDeleted