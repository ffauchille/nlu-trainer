export class Intent {
  id: string;
  name: string;
  utterances: string[];

  constructor(props: Partial<Intent>) {
    this.id = props.id || "";
    this.name = props.name || "";
    this.utterances = props.utterances || [];
  }
}

export class IntentCreation {
    name: string;
    utterances: string[];

    constructor(props: Partial<IntentCreation>) {
        this.name = props.name || "no name";
        this.utterances = props.utterances || [];
    }
}