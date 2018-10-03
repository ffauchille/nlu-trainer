import { get, post, del, postFile } from "./common";
import { map, flatMap } from "rxjs/operators";
import { AppModel } from "../models/app";
import { Observable, of } from "rxjs";
import { Intent } from "../models/intent";
import { Example } from "../models/example";
import { normalize } from "../utils";
import { Entity } from "../models/entity";
import {
  TestSuite,
  TestSuiteCreation,
  TestSuiteEvaluation,
  ModelEvaluation
} from "../models/testsuite";
import { Category } from "../models/category";

export const getApps = (): Observable<AppModel[]> =>
  get("/apps").pipe(map(r => (r as AppModel[]).map(e => new AppModel(e))));
export const getAppIntents = (app: AppModel | string): Observable<Intent[]> => {
  if (app) {
    let aId: string = typeof app === "string" ? app : app._id;
    return get(`/intents?appId=${aId}`).pipe(map(r => r as Intent[]));
  } else return of([]);
};

export const getCategoryIntents = (
  cat: Category | string
): Observable<Intent[]> => {
  let catId: string = typeof cat === "string" ? cat : cat._id;
  return get<Intent[]>(`/intents?categoryId=${catId}`).pipe(
    map(is => is.map(i => new Intent(i)))
  );
};

export const getIntentExamples = (
  intent: Intent | string
): Observable<Example[]> => {
  if (intent) {
    let iId: string = typeof intent === "string" ? intent : intent._id;
    return get(`/examples?intent=${iId}`).pipe(
      map(r => (r as any[]).map(e => new Example(e)))
    );
  } else return of([]);
};
export const getAppEntities = (
  app: AppModel | string
): Observable<Entity[]> => {
  if (app) {
    let aId: string = typeof app === "string" ? app : app._id;
    return get(`/entities?appId=${aId}`).pipe(
      map(r => (r as Entity[]).map(e => new Entity(e)))
    );
  } else return of([]);
};

export const getAppTestSuites = (appId: string): Observable<TestSuite[]> =>
  get<any[]>(`/testsuites?appId=${appId}`).pipe(
    map(r => r.map(ts => new TestSuite(ts)))
  );

export const createApp = (appCreate: Partial<AppModel>): Observable<any> =>
  post("/apps", appCreate);
export const createIntent = (
  intentCreate: Partial<Intent>
): Observable<Intent> =>
  post("/intents", intentCreate).pipe(map(r => new Intent(r)));
export const createExample = (
  exampleCreate: Partial<Example>
): Observable<any> => post("/examples", exampleCreate);
export const createEntity = (
  entityCreate: Partial<Entity>
): Observable<Entity> =>
  post("/entities", entityCreate).pipe(map(r => new Entity(r)));
export const createTestSuite = (
  testSuiteCreate: Partial<TestSuiteCreation>
): Observable<TestSuite> => {
  return post<Partial<TestSuite>, TestSuite>("/testsuites", testSuiteCreate);
};

export const trainApp = (app: AppModel): Observable<any> => {
  var obs = of(app);
  switch (app.type) {
    case "RASA": {
      obs = post("/rasa/models/train", { project: app._id });
      break;
    }
    default:
  }
  return obs;
};

export const predict = (app: AppModel, text: string): Observable<any> => {
  var obs = of({});
  if (app.type === "RASA") {
    obs = post("/rasa/models/predict", { project: normalize(app.name), text });
  }
  return obs;
};

export const evaluateTestSuite = (
  ts: TestSuite
): Observable<TestSuiteEvaluation> =>
  get(`/testsuites/evaluate?testSuiteId=${ts._id}`).pipe(
    map(r => new ModelEvaluation(r).intent_evaluation)
  );

export const deleteIntent = (i: Intent) => del("/intents?intent=" + i._id);
export const deleteExample = (ex: Example) =>
  del("/examples?example=" + ex._id);
export const deleteApp = (app: AppModel) => del("/apps?app=" + app._id);

export const getStatus = get("/status");

/** Append examples from CSV `file` to the test suite defined by `suiteId` */
export const uploadCSVTrainings$ = (
  file: File,
  suiteId: string
): Observable<TestSuite> =>
  postFile(`/testsuites/examples/csv?testSuiteId=${suiteId}`, file);

export const getCategories = (appId: string): Observable<Category[]> =>
  get<Category[]>(`/categories?appId=${appId}`).pipe(
    map(r => r.map(e => new Category(e)))
  );

export const createCategory = (
  creation: Partial<Category>
): Observable<Category> =>
  post<Partial<Category>, Category>("/categories", creation).pipe(
    map(r => new Category(r))
  );


export const getAppByName = (name: string): Observable<AppModel> => 
    get(`/apps/byname?appName=${name}`).pipe(map(r => new AppModel(r)));