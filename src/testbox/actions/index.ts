import { Action } from "redux";
import { AppModel } from "../../models/app";

export type TestApp = Action<string> & { app: AppModel }
export const TestAppAction = "apps#TestApp"
export function testApp(app: AppModel): TestApp {
    return { type: TestAppAction, app }
}

export type Actions =
    | TestApp