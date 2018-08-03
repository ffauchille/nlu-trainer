import { RasaAppStatus } from "./app";

export type RASAAppsStatus = {
  available_projects: Availableprojects;
}

type Availableprojects = {
  [key: string]: AppStatus;
}

type AppStatus = {
  status: RasaAppStatus;
  available_models: string[];
  loaded_models: string[];
}