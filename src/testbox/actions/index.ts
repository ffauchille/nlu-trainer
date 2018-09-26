import { Action } from "redux";
import { AppModel } from "../../models/app";
import { PredictionResult } from "../reducer"
import { TestSuite } from "../../models/testsuite";

export type TestApp = Action<string> & { app: AppModel }
export const TestAppAction = "testbox#TestApp"
export function testApp(app: AppModel): TestApp {
    return { type: TestAppAction, app }
}

export type Predict = Action<string> & { text: string, app: AppModel }
export const PredictAction = "testbox#Predict"
export function predict(app: AppModel, text: string): Predict {
    return { type: PredictAction, app, text }
}

export type Prediction = Action<string> & { app: AppModel, prediction: PredictionResult }
export const PredictionAction = "testbox#Prediction"
export function prediction(app: AppModel, prediction: PredictionResult): Prediction {
    return { type: PredictionAction, app, prediction }
}

export type CreateTestSuite = Action<string> & { creation: Partial<TestSuite> }
export const CreateTestSuiteAction = "testbox#CreateTestSuite"
export function createTestSuite(creation: Partial<TestSuite>): CreateTestSuite {
    return { type: CreateTestSuiteAction, creation }
}

export type TestSuiteCreated = Action<string> & { testSuite: TestSuite }
export const TestSuiteCreatedAction = "testbox#TestSuiteCreated"
export function testSuiteCreated( testSuite: TestSuite): TestSuiteCreated {
    return { type: TestSuiteCreatedAction, testSuite }
}

export type UploadCSV = Action<string> & { data: FormData }
export const UploadCSVAction = "testbox#UploadCSV"
export function uploadCSV(data: FormData): UploadCSV {
    return { type: UploadCSVAction, data }
}

export type CSVUploaded = Action<string> & {}
export const CSVUploadedAction = "testbox#CSVUploaded"
export function csvUploaded(): CSVUploaded {
    return { type: CSVUploadedAction }
}

export type Actions =
    | TestApp
    | Predict
    | Prediction
    | CreateTestSuite
    | TestSuiteCreated
    | UploadCSV
    | CSVUploaded