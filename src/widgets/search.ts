import {SearchModel} from '../models/searchModel';

export class Search {
    model: SearchModel;
    query: string;

    activate(model) {
        this.model = model;
    }

    search() {
        var query = {};
        query[this.model.param] = this.query;
        this.model.searchFn(query);
    }
}