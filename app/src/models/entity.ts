/**
 * 
 * 
 * {
 *  "text": "in the centre of New York City",
 *  "intent": "search",
 *  "entities": [   // NLUEntity[]
 *    {
 *      "start": 17,
 *      "end": 30,
 *      "value": "New York City",
 *      "entity": "city"
 *    }
 *  ]
 * }
 */

export class NLUEntity {
    start: number;
    end: number;
    value: string;
    entity: string;

    constructor(props: Partial<NLUEntity>) {
        this.start = props.start || 0
        this.end = props.end || 0
        this.value = props.value || ""
        this.entity = props.value || ""
    }
}

/**
 * {
 *       "value": "New York City",
 *       "synonyms": ["NYC", "nyc", "the big apple"]
 *  }
 */
export class NLUEntitySynonym {
    value: string;
    synonyms: string[];

    constructor(props: Partial<NLUEntitySynonym>) {
        this.value = props.value || ""
        this.synonyms = props.synonyms || []
    }
}