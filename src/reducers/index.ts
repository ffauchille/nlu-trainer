import { default as intentReducer, IntentState} from "../intents/reducer"
import { default as appsReducer, AppsState} from "../apps/reducer";
import { default as examplesReducer, ExamplesState } from "../examples/reducer";
import { reducer as formReducer } from "redux-form";
import { RouterState } from "connected-react-router";

type FormState = { form: any }

export type StoreState =
    & RouterState
    & FormState
    & IntentState
    & AppsState
    & ExamplesState

/** Aggregate all component's reducers */
export default {
    ...intentReducer,
    ...appsReducer,
    ...examplesReducer,
    ...{ form: formReducer }
}