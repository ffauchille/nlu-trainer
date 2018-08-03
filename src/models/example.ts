import { NLUEntity } from "./entity";

export class Example {
    _id: string;
    text: string;
    intentId: string;
    intentName: string;
    entities: NLUEntity[];

    constructor(props: Partial<Example>) {
        this._id = props._id || ""
        this.text = props.text || ""
        this.intentId = props.intentId || ""
        this.intentName = props.intentName || ""
        this.entities = props.entities || []
    }
}