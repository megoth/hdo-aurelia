export class FacetModel {
    navigate: Function;
    param: string;
    terms: Object[];
    title: string;

    constructor(navigate: Function, param: string, terms: Object[], title: string) {
        this.navigate = navigate;
        this.param = param;
        this.terms = terms;
        this.title = title;
    }
}