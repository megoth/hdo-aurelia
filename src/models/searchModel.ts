export class SearchModel {
    param: string;
    query: Object;
    search: Function;
    title: string;
    value: string;

    constructor(param: string, query: Object, title: string, value: string) {
        this.param = param;
        this.query = query;
        this.title = title;
        this.value = value || '';
    }
}