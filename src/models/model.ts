import { Example } from "./example";
import { NLUEntitySynonym } from "./entity";

export class NLUModel {
 
    common_examples: Example[]
    regex_features : NLURegexFeature[]
    entity_synonyms: NLUEntitySynonym[]
 
    constructor(props: Partial<NLUModel>) {
        this.common_examples = props.common_examples || []
        this.regex_features = props.regex_features || []
        this.entity_synonyms = props.entity_synonyms || []
    }
}

export class NLURegexFeature {
    name: string;
    pattern: string;

    constructor(props: Partial<NLURegexFeature>) {
        this.name = props.name || ""
        this.pattern = props.pattern || ""
    }
}

class NLURasaData {
    rasa_nlu_data: NLUModel

    constructor(props: Partial<NLURasaData>) {
        this.rasa_nlu_data = props.rasa_nlu_data || new NLUModel({})
    }
}

export class NLUModelCreation {
    project: string;
    model?: string;
    language?: string;
    pipeline?: string | string[];
    data: NLURasaData;

    constructor(props: Partial<NLUModelCreation>) {
        this.project = props.project || ""
        this.model = props.model
        this.language = props.language
        this.pipeline = props.pipeline
        this.data = props.data || new NLURasaData({})
    }
}