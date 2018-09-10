import { default as intentReducer, IntentState} from "../intents/reducer"
import { default as appsReducer, AppsState} from "../apps/reducer";
import { default as examplesReducer, ExamplesState } from "../examples/reducer";
import { default as testboxReducer, TestBoxState } from "../testbox/reducer";
import { reducer as formReducer } from "redux-form";
import { RouterState } from "connected-react-router";

type FormState = { form: any }

export type StoreState =
    & RouterState
    & FormState
    & IntentState
    & AppsState
    & ExamplesState
    & TestBoxState

/** Aggregate all component's reducers */
export default {
    ...intentReducer,
    ...appsReducer,
    ...examplesReducer,
    ...testboxReducer,
    ...{ form: formReducer }
}