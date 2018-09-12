import { Entity } from "./entity";

class EntityInside {
    start: number;
    end: number;
    entity: string;
    value: string;

    constructor(props: Partial<EntityInside>) {
        this.start = props.start || 0
        this.end = props.end || 0
        this.entity = props.entity || ""
        this.value = props.value || ""
    }
}

export class Example {
    _id: string;
    text: string;
    intentId: string;
    intentName: string;
    entities: EntityInside[];

    constructor(props: Partial<Example>) {
        this._id = props._id || ""
        this.text = props.text || ""
        this.intentId = props.intentId || ""
        this.intentName = props.intentName || ""
        this.entities = (props.entities || []).map(ei => new EntityInside(ei))
    }
}