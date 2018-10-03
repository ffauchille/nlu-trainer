import { Action } from "redux";
import { Category } from "../models/category";


export type LoadCategories = Action<string> & {}
export const LoadCategoriesAction = "category#LoadCategories"
export function loadCategories(): LoadCategories {
    return { type: LoadCategoriesAction }
}

export type CategoriesLoaded = Action<string> & { categories: Category[] }
export const CategoriesLoadedAction = "category#CategoriesLoaded"
export function categoriesLoaded(categories: Category[]): CategoriesLoaded {
    return { type: CategoriesLoadedAction, categories }
}

export type CreateCategory = Action<string> & { create: Partial<Category> }
export const CreateCategoryAction = "categories#CreateCategory"
export function CreateCategory(create: Partial<Category>): CreateCategory {
    return { type: CreateCategoryAction, create }
}

export type SelectCategory = Action<string> & { category: Category }
export const SelectCategoryAction = "category#SelectCategory"
export function selectCategory(category: Category): SelectCategory {
    return { type: SelectCategoryAction, category }
}

export type UnselectCategory = Action<string> & {}
export const UnselectCategoryAction = "category#UnselectCategory"
export function unselectCategory(): UnselectCategory {
    return { type: UnselectCategoryAction }
}

export type Actions = 
    | LoadCategories
    | CategoriesLoaded
    | CreateCategory
    | SelectCategory
    | UnselectCategory