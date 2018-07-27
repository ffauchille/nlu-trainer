import { Actions as AppsActions } from '../apps/actions'
import { Actions as IntentActions } from '../intents/actions'
import { Actions as ExamplesActions } from '../examples/actions'

export type StoreActions = 
    | IntentActions 
    | AppsActions 
    | ExamplesActions