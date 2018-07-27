export class Intent {
  _id: string;
  name: string;
  examples: string[];

  constructor(props: Partial<Intent>) {
    this._id = props._id || "";
    this.name = props.name || "";
    this.examples = props.examples || [];
  }
}

export class IntentCreation {
    appId: string;
    name: string;
    examples: string[];

    constructor(props: Partial<IntentCreation>) {
        this.appId = props.appId || "";
        this.name = props.name || "no name";
        this.examples = props.examples || [];
    }
}