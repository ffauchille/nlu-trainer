import { NLUEntity } from "./entity";

export class Example {
    text: string;
    intent: string;
    entities: NLUEntity[];

    constructor(props: Partial<Example>) {
        this.text = props.text || ""
        this.intent = props.intent || ""
        this.entities = props.entities || []
    }
}