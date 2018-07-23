import { NLUEntity } from "./entity";

export class NLUExample {
    text: string;
    intent: string;
    entities: NLUEntity[];

    constructor(props: Partial<NLUExample>) {
        this.text = props.text || ""
        this.intent = props.intent || ""
        this.entities = props.entities || []
    }
}