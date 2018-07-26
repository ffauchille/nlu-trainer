import { get } from "./common";
import { map } from "../../node_modules/rxjs/operators";
import { AppModel } from "../models/app";
import { Observable } from "../../node_modules/rxjs";


export const getApps: Observable<AppModel[]> = get("/api/apps").pipe(map(r => r as AppModel[]))


export const getStatus = get("/api/status")