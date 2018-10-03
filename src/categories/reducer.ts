import { Reducer } from "redux";
import { Actions, LoadCategoriesAction, CategoriesLoadedAction, CategoriesLoaded, SelectCategoryAction, SelectCategory, UnselectCategoryAction } from "./actions";
import { Category } from "../models/category";

export type State = {
  categories: Category[];
  categorySelected?: Category;
  categoriesAreLoading: boolean
};

export const defaultState = (): State => ({
  categories: [],
  categoriesAreLoading: false
});

export const reducer: Reducer<State> = (
  state: State = defaultState(),
  action: Actions
): State => {
  switch (action.type) {
    case LoadCategoriesAction: {
        return {
            ...state,
            categoriesAreLoading: true
        }
    }
    case CategoriesLoadedAction: {
        return {
            ...state,
            categoriesAreLoading: false,
            categories: (action as CategoriesLoaded).categories
        }
    }

    case SelectCategoryAction: {
        return {
            ...state,
            categorySelected: (action as SelectCategory).category
        }
    }

    case UnselectCategoryAction: {
        return {
            ...state,
            categorySelected: undefined
        }
    }

    default: {
      return state;
    }
  }
};

export type CategoryState = { category: State };
export default { category: reducer };
