import { RouterState } from "connected-react-router";
import { reducer as formReducer } from "redux-form";
import { AppsState, default as appsReducer } from "../apps/reducer";
import { CategoryState, default as categoryReducer } from "../categories/reducer";
import { default as examplesReducer, ExamplesState } from "../examples/reducer";
import { default as intentReducer, IntentState } from "../intents/reducer";
import { default as testboxReducer, TestBoxState } from "../testbox/reducer";

type FormState = { form: any };

export type StoreState = RouterState &
  FormState &
  CategoryState &
  IntentState &
  AppsState &
  ExamplesState &
  TestBoxState;

/** Aggregate all component's reducers */
export default {
  ...categoryReducer,
  ...intentReducer,
  ...appsReducer,
  ...examplesReducer,
  ...testboxReducer,
  ...{ form: formReducer }
};
