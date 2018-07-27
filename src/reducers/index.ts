import { default as intentReducer, IntentState} from "../intents/reducer"
import { default as appsReducer, AppsState} from "../apps/reducer";
import { default as examplesReducer, ExamplesState } from "../examples/reducer";
import { RouterState } from "connected-react-router";

export type StoreState =
    & RouterState
    & IntentState
    & AppsState
    & ExamplesState

/** Aggregate all component's reducers */
export default {
    ...intentReducer,
    ...appsReducer,
    ...examplesReducer
}