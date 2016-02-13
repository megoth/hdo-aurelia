import {FacetModel} from '../models/facetModel';

export class Facet {
    model: FacetModel;

    activate(model) {
        this.model = model;
    }

    clear() {
        this.model.navigate();
    }

    select(termName) {
        var query = {};
        query[this.model.param] = termName;
        this.model.navigate(query);
    }
}