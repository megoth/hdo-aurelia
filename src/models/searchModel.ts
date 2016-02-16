export class SearchModel {
    param: string;
    query: Object;
    searchFn: Function;
    title: string;
    value: string;

    constructor(searchFn: Function, param: string, query: Object, title: string, value: string) {
        this.param = param;
        this.query = query;
        this.searchFn = searchFn;
        this.title = title;
        this.value = value || '';
    }
}