export class Intent {
  _id: string;
  appId: string;
  name: string;
  examples: string[];

  constructor(props: Partial<Intent>) {
    this._id = props._id || "";
    this.appId = props.appId || "";
    this.name = props.name || "";
    this.examples = props.examples || [];
  }
}