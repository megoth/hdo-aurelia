import {SearchModel} from '../models/searchModel';

export class Search {
    model: SearchModel;

    activate(model) {
        this.model = model;
    }

    search() {
        var query = { page: 1 };
        query[this.model.param] = this.model.value;
        this.model.searchFn(query);
    }
}