import { Action } from "redux";
import { AppModel } from "../../models/app";
import { PredictionResult } from "../reducer"
import { TestSuite, TestSuiteCreation, TestSuiteEvaluation } from "../../models/testsuite";

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

export type CreateTestSuite = Action<string> & { creation: Partial<TestSuiteCreation> }
export const CreateTestSuiteAction = "testbox#CreateTestSuite"
export function createTestSuite(creation: Partial<TestSuiteCreation>): CreateTestSuite {
    return { type: CreateTestSuiteAction, creation }
}

export type LoadTestSuites = Action<string> & { appId: string }
export const LoadTestSuitesAction = "testbox#LoadTestSuites"
export function loadTestSuites(appId: string): LoadTestSuites {
    return { type: LoadTestSuitesAction, appId }
}

export type TestSuitesLoaded = Action<string> & { suites: TestSuite[] }
export const TestSuitesLoadedAction = "testbox#TestSuitesLoaded"
export function testSuiteLoaded(suites: TestSuite[]): TestSuitesLoaded {
    return { type: TestSuitesLoadedAction, suites }
}

export type UploadCSV = Action<string> & { file: File, testSuiteId: string }
export const UploadCSVAction = "testbox#UploadCSV"
export function uploadCSV(file: File, testSuiteId: string): UploadCSV {
    return { type: UploadCSVAction, file, testSuiteId }
}

export type CSVUploaded = Action<string> & {}
export const CSVUploadedAction = "testbox#CSVUploaded"
export function csvUploaded(): CSVUploaded {
    return { type: CSVUploadedAction }
}

export type StartTestSuiteEvaluation = Action<string> & { suite: TestSuite }
export const StartTestSuiteEvaluationAction = "testbox#StartTestSuiteEvaluation"
export function startTestSuiteEvaluation(suite: TestSuite): StartTestSuiteEvaluation {
    return { type: StartTestSuiteEvaluationAction, suite }
}

export type TestSuiteEvaluated = Action<string> & { result:  TestSuiteEvaluation }
export const TestSuiteEvaluatedAction = "testbox#TestSuiteEvaluated"
export function testSuiteEvaluated(result:  TestSuiteEvaluation): TestSuiteEvaluated {
    return { type: TestSuiteEvaluatedAction, result }
}

export type SelectSuiteForEvaluation = Action<string> & {suite: TestSuite}
export const SelectSuiteForEvaluationAction = "testbox#SelectSuiteForEvaluation"
export function selectSuiteForEvaluation(suite: TestSuite): SelectSuiteForEvaluation {
    return { type: SelectSuiteForEvaluationAction, suite }
}

export type CloseTestSuiteEvaluation = Action<string> & {}
export const CloseTestSuiteEvaluationAction = "testbox#CloseTestSuiteEvaluation"
export function closeTestSuiteEvaluation(): CloseTestSuiteEvaluation {
    return { type: CloseTestSuiteEvaluationAction }
}

export type Actions =
    | TestApp
    | Predict
    | Prediction
    | CreateTestSuite
    | LoadTestSuites
    | TestSuitesLoaded
    | SelectSuiteForEvaluation
    | CloseTestSuiteEvaluation
    | UploadCSV
    | CSVUploaded