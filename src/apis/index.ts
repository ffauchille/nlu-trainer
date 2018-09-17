import { get, post, del } from "./common";
import { map } from "rxjs/operators";
import { AppModel } from "../models/app";
import { Observable, of } from "rxjs";
import { Intent } from "../models/intent";
import { Example } from "../models/example";
import { normalize } from "../utils";
import { Entity } from "../models/entity";
import { TestSuite } from "../models/testsuite";


export const getApps = (): Observable<AppModel[]> => get("/apps").pipe(map(r => (r as AppModel[]).map(e => new AppModel(e))))
export const getAppIntents = (app: AppModel | string): Observable<Intent[]> => { 
    if (app) {
        let aId: string = typeof app === 'string' ? app : app._id;
        return get(`/intents?appId=${aId}`).pipe(map(r => r as Intent[]))
    } else return of([])
}
export const getIntentExamples = (intent: Intent | string): Observable<Example[]> => {
    if (intent) {
        let iId: string = typeof intent === 'string' ? intent : intent._id;
        return get(`/examples?intent=${iId}`).pipe(map(r => (r as any[]).map(e => new Example(e))))
    } else return of([])
}
export const getAppEntities = (app: AppModel | string): Observable<Entity[]> => { 
    if (app) {
        let aId: string = typeof app === 'string' ? app : app._id;
        return get(`/entities?appId=${aId}`).pipe(map(r => (r as Entity[]).map(e => new Entity(e))))
    } else return of([])
}

export const createApp = (appCreate: Partial<AppModel>): Observable<any> => post("/apps", appCreate)
export const createIntent = (intentCreate: Partial<Intent>): Observable<any> => post("/intents", intentCreate)
export const createExample = (exampleCreate: Partial<Example>): Observable<any> => post("/examples", exampleCreate)
export const createEntity = (entityCreate: Partial<Entity>): Observable<Entity> => post("/entities", entityCreate).pipe(map(r => new Entity(r)))
export const createTestSuite = (testSuiteCreate: Partial<TestSuite>): Observable<TestSuite> => post("/testsuites", testSuiteCreate).pipe(map(r => new TestSuite(r)))


export const trainApp = (app: AppModel): Observable<any> => {
    var obs = of(app)
    switch (app.type) {
        case "RASA": {
            obs = post("/rasa/models/train", { project: app._id })
            break;
        }
        default:
    }
    return obs;
}

export const predict = (app: AppModel, text: string): Observable<any> => {
    var obs = of({})
    if (app.type === "RASA") {
        obs = post("/rasa/models/predict", { project: normalize(app.name), text })
    }
    return obs
}

export const deleteIntent = (i: Intent) => del("/intents?intent=" + i._id)
export const deleteExample = (ex: Example) => del("/examples?example=" + ex._id)
export const deleteApp = (app: AppModel) => del("/apps?app=" + app._id)

export const getStatus = get("/status")