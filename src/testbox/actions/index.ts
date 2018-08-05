import { Action } from "redux";
import { AppModel } from "../../models/app";
import { PredictionResult } from "../reducer"

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

export type Actions =
    | TestApp
    | Predict
    | Prediction