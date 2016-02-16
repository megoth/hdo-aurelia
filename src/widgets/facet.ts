import {FacetModel} from '../models/facetModel';

export class Facet {
    model: FacetModel;
    activeTerms: Object[];
    inactiveTerms: Object[];

    activate(model) {
        this.model = model;
        this.activeTerms = model.terms.filter(a => a.active);
        this.inactiveTerms = model.terms.filter(a => !a.active); 
    }

    clear() {
        var query = { page: 1 };
        query[this.model.param] = '';
        this.model.navigate(query);
    }

    select(termName) {
        var query = { page: 1 };
        query[this.model.param] = termName;
        this.model.navigate(query);
    }
}