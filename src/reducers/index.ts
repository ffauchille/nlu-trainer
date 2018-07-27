import { routerReducer, RouterState } from "react-router-redux";
import { default as intentReducer, IntentState} from "../intents/reducer"
import { default as appsReducer, AppsState} from "../apps/reducer";
import { default as examplesReducer, ExamplesState } from "../examples/reducer";

const coreReducer = { router: routerReducer }
type CoreState = { router: RouterState }


export type StoreState = 
    & CoreState
    & IntentState
    & AppsState
    & ExamplesState

/** Aggregate all component's reducers */
export default {
    ...coreReducer,
    ...intentReducer,
    ...appsReducer,
    ...examplesReducer
}