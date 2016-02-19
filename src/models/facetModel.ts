export class FacetModel {
    navigate: Function;
    param: string;
    terms: Object[];
    title: string;

    constructor(param: string, terms: Object[], title: string) {
        this.param = param;
        this.terms = terms;
        this.title = title;
    }
}