import schema from "json-schema";

type AppStatus = "ready" | "not-trained" | "empty"

/** TODO: validate payload with JSON schema */
const appModelSchema = {
    id: "appModelSchema",
    type: "object",
    properties: {
        name: { type: "string" },
        status: { type: "string" }
    }
}


export class AppModel {
    _id: string;
    name: string;
    status: AppStatus;

    constructor(props: Partial<AppModel>) {
        this._id = props._id || ""
        this.name = props.name || ""
        this.status = props.status || "not-trained"
    }
}