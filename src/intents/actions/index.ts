import { Action } from "redux";
import { AppModel } from "../../models/app";
import { Intent } from "../../models/intent";
import { Entity } from "../../models/entity";
import { Category } from "../../models/category";

export type LoadCategoryIntents = Action<string> & {
  category: Category | string;
};
export const LoadCategoryIntentsAction = "intents#LoadCategoryIntent";
export function loadCategoryIntents(
  category: Category | string
): LoadCategoryIntents {
  return { type: LoadCategoryIntentsAction, category };
}

export type CategoryIntentsLoaded = Action<string> & {
  intents: Intent[];
};

export const CategoryIntentsLoadedAction = "intents#CategoryIntentsLoaded";
export function categoryIntentsLoaded(
  intents: Intent[]
): CategoryIntentsLoaded {
  return { type: CategoryIntentsLoadedAction, intents };
}

export type AppEntitiesLoaded = Action<string> & { entities: Entity[] };
export const AppEntitiesLoadedAction = "intents#AppEntitiesLoaded";
export function appEntitiesLoaded(entities: Entity[]): AppEntitiesLoaded {
  return { type: AppEntitiesLoadedAction, entities };
}

export type UnselectIntent = Action<string> & {};
export const UnselectIntentAction = "intents#UnselectIntent";
export function unselectIntent(): UnselectIntent {
  return { type: UnselectIntentAction };
}

export type CreateIntent = Action<string> & {
  intentCreate: Partial<Intent>;
};
export const CreateIntentAction = "intents#CreateIntent";
export function createIntent(intentCreate: Partial<Intent>): CreateIntent {
  return { type: CreateIntentAction, intentCreate };
}

export type UpdateIntent = Action<string> & {
  intentUpdated: Intent;
};
export const UpdateIntentAction = "intents#UpdateIntent";
export function updateIntent(intentUpdated: Intent): UpdateIntent {
  return { type: UpdateIntentAction, intentUpdated };
}

export type IntentSelected = Action<string> & {
  intent: Intent;
};
export const IntentSelectedAction = "intents#IntentSelected";
export function intentSelected(intent: Intent): IntentSelected {
  return { type: IntentSelectedAction, intent };
}

export type DeleteIntent = Action<string> & { intent: Intent };
export const DeleteIntentAction = "intents#DeleteIntent";
export function deleteIntent(intent: Intent): DeleteIntent {
  return { type: DeleteIntentAction, intent };
}

export type IntentDeleted = Action<string> & { intent: Intent };
export const IntentDeletedAction = "intents#IntentDeleted";
export function intentDeleted(intent: Intent): IntentDeleted {
  return { type: IntentDeletedAction, intent };
}

export type DeleteEntity = Action<string> & { entity: Entity };
export const DeleteEntityAction = "intents#DeleteEntity";
export function deleteEntity(entity: Entity): DeleteEntity {
  return { type: DeleteEntityAction, entity };
}

export type EntityDeleted = Action<string> & { entity: Entity };
export const EntityDeletedAction = "intents#EntityDeleted";
export function entityDeleted(entity: Entity): EntityDeleted {
  return { type: EntityDeletedAction, entity };
}

export type CreateEntity = Action<string> & { entity: Partial<Entity> };
export const CreateEntityAction = "intents#CreateEntity";
export function createEntity(entity: Partial<Entity>): CreateEntity {
  return { type: CreateEntityAction, entity };
}

export type EntityCreated = Action<string> & {};
export const EntityCreatedAction = "intents#EntityCreated";
export function EntityCreated(): EntityCreated {
  return { type: EntityCreatedAction };
}

export type UpdateEntity = Action<string> & { entity: Entity };
export const UpdateEntityAction = "intents#UpdateEntity";
export function updateEntity(entity: Entity): UpdateEntity {
  return { type: UpdateEntityAction, entity };
}

export type EntityUpdated = Action<string> & {};
export const EntityUpdatedAction = "intents#EntityUpdated";
export function entityUpdated(): EntityUpdated {
  return { type: EntityUpdatedAction };
}

export type LoadAppEntities = Action<string> & { app: AppModel | string };
export const LoadAppEntitiesAction = "intents#LoadAppEntities";
export function loadAppEntities(app: AppModel | string): LoadAppEntities {
  return { type: LoadAppEntitiesAction, app };
}

export type Actions =
  | LoadCategoryIntents
  | LoadAppEntities
  | CategoryIntentsLoaded
  | AppEntitiesLoaded
  | UnselectIntent
  | CreateIntent
  | UpdateIntent
  | IntentSelected
  | DeleteIntent
  | DeleteEntity
  | IntentDeleted
  | EntityDeleted
  | CreateEntity
  | EntityCreated
  | UpdateEntity
  | EntityUpdated;
