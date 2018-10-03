export class Intent {
  _id: string;
  categoryId: string;
  name: string;
  examples: string[];

  constructor(props: Partial<Intent>) {
    this._id = props._id || "";
    this.categoryId = props.categoryId || "";
    this.name = props.name || "";
    this.examples = props.examples || [];
  }
}
