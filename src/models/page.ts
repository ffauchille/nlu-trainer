export class Page {
    offset: number;
    size: number;

    constructor(props: Partial<Page>) {
        this.offset = props.offset || 1
        this.size = props.size || 20
    }
}