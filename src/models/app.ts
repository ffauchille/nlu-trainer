import schema from "json-schema";

export type RasaAppStatus = "ready" | "training" | "failed" | "empty" | "unknow"

/** TODO: validate payload with JSON schema */
const appModelSchema = {
    id: "appModelSchema",
    type: "object",
    properties: {
        name: { type: "string" },
        status: { type: "string" }
    }
}

export type AppModelType = "RASA"

export interface AppModel {
    _id: string;
    name: string;
    type: AppModelType;
}

export type AppStatus = {
    app: AppModel;
    status: string
}

export class RasaApp implements AppModel {
    _id: string;
    name: string;
    type: AppModelType = "RASA";

    constructor(props: Partial<RasaApp>) {
        this._id = props._id || ""
        this.name = props.name || ""
    }
}