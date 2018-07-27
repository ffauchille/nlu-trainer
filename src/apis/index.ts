import { get } from "./common";
import { map } from "../../node_modules/rxjs/operators";
import { AppModel } from "../models/app";
import { Observable } from "../../node_modules/rxjs";
import { Intent } from "../models/Intent";


export const getApps = (): Observable<AppModel[]> => get("/apps").pipe(map(r => r as AppModel[]))
export const getAppIntents = (app: AppModel): Observable<Intent[]> => get(`/intents?appId=${app._id}`).pipe(map(r => r as Intent[]))


export const getStatus = get("/status")