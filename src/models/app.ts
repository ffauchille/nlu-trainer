import schema from "json-schema";

type RasaAppStatus = "ready" | "not-trained" | "empty"

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

export class RasaApp implements AppModel {
    _id: string;
    name: string;
    type: AppModelType = "RASA";
    status: RasaAppStatus;

    constructor(props: Partial<RasaApp>) {
        this._id = props._id || ""
        this.name = props.name || ""
        this.status = props.status || "not-trained"
    }
}