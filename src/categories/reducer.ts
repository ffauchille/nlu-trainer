import { Reducer } from "redux";
import {
  Actions,
  LoadCategoriesAction,
  CategoriesLoadedAction,
  CategoriesLoaded,
  SelectCategoryAction,
  SelectCategory,
  UnselectCategoryAction,
  StopContentLoader,
  StartContentLoaderAction,
  StopContentLoaderAction
} from "./actions";
import { Category } from "../models/category";

export type State = {
  categories: Category[];
  selected?: Category;
  loadingContent: boolean;
};

export const defaultState = (): State => ({
  categories: [],
  loadingContent: false
});

export const reducer: Reducer<State> = (
  state: State = defaultState(),
  action: Actions
): State => {
  switch (action.type) {
    case CategoriesLoadedAction: {
      return {
        ...state,
        categories: (action as CategoriesLoaded).categories
      };
    }

    case SelectCategoryAction: {
      return {
        ...state,
        selected: (action as SelectCategory).category
      };
    }

    case StartContentLoaderAction: {
      return {
        ...state,
        loadingContent: true
      };
    }

    case StopContentLoaderAction: {
      return {
        ...state,
        loadingContent: false
      };
    }

    case UnselectCategoryAction: {
      return {
        ...state,
        selected: undefined
      };
    }

    default: {
      return state;
    }
  }
};

export type CategoryState = { category: State };
export default { category: reducer };
