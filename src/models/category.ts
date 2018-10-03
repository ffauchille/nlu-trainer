export class Category {
    _id: string;
    appId: string;
    name: string;

    constructor(props: Partial<Category>) {
        this._id = props._id || ""
        this.appId = props.appId || ""
        this.name = props.name || ""
    }
}