import { Action } from "redux";
import { Category } from "../models/category";

export type LoadCategories = Action<string> & { appId: string };
export const LoadCategoriesAction = "category#LoadCategories";
export function loadCategories(appId: string): LoadCategories {
  return { type: LoadCategoriesAction, appId };
}

export type CategoriesLoaded = Action<string> & { categories: Category[] };
export const CategoriesLoadedAction = "category#CategoriesLoaded";
export function categoriesLoaded(categories: Category[]): CategoriesLoaded {
  return { type: CategoriesLoadedAction, categories };
}

export type CreateCategory = Action<string> & { create: Partial<Category> };
export const CreateCategoryAction = "categories#CreateCategory";
export function createCategory(create: Partial<Category>): CreateCategory {
  return { type: CreateCategoryAction, create };
}

export type UpdateCategory = Action<string> & { category: Category };
export const UpdateCategoryAction = "category#UpdateCategory";
export function updateCategory(category: Category): UpdateCategory {
  return { type: UpdateCategoryAction, category };
}

export type SelectCategory = Action<string> & { category: Category };
export const SelectCategoryAction = "category#SelectCategory";
export function selectCategory(category: Category): SelectCategory {
  return { type: SelectCategoryAction, category };
}

export type StartContentLoader = Action<string> & {};
export const StartContentLoaderAction = "category#StartContentLoader";
export function startContentLoader(): StartContentLoader {
  return { type: StartContentLoaderAction };
}

export type StopContentLoader = Action<string> & {};
export const StopContentLoaderAction = "category#StopContentLoader";
export function stopContentLoader(): StopContentLoader {
  return { type: StopContentLoaderAction };
}

export type UnselectCategory = Action<string> & {};
export const UnselectCategoryAction = "category#UnselectCategory";
export function unselectCategory(): UnselectCategory {
  return { type: UnselectCategoryAction };
}

export type Actions =
  | LoadCategories
  | CategoriesLoaded
  | CreateCategory
  | UpdateCategory
  | SelectCategory
  | StartContentLoader
  | StopContentLoader
  | UnselectCategory;
