/**
 * {
 *       "value": "New York City",
 *       "synonyms": ["NYC", "nyc", "the big apple"]
 *  }
 */
export class Entity {
    _id: string;
    value: string;
    synonyms: string[];
    appId: string;

    constructor(props: Partial<Entity>) {
        this._id = props._id || ""
        this.value = props.value || ""
        this.synonyms = props.synonyms || []
        this.appId = props.appId || ""
    }
}