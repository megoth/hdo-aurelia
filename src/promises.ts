import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import _ from 'lodash';

import {PromisesApi, PromisesQuery, PromisesResponse} from './api/promises-api';
import {FacetModel} from './models/facetModel';
import {PagerModel} from './models/pagerModel';
import {PromisesModel} from './models/promisesModel';
import {SearchModel} from './models/searchModel';
import {constructLocalUrl, parseQuery} from './util/url';

@inject(HttpClient, Router)
export class Promises {
    api: PromisesApi;
    heading: string = 'Promises';
    pagerModel: PagerModel;
    facetModels: FacetModel[];
    tableModel: PromisesModel;
    searchModel: SearchModel;
    query: PromisesQuery;

    constructor(private http: HttpClient, private router: Router) {
        this.api = new PromisesApi(http);
        this.query = { page: 1 };
    }

    activate(params, routeConfig) {
        return this.navigate(params);
    }

    // methods
    createFacetModel(f) {
        return new FacetModel(f.param, f.terms, f.title);
    }

    createPagerModel(r: PromisesResponse) {
        return new PagerModel(r.current_page, r.total_pages, !!r.next_url, !!r.previous_url);
    }

    createSearchModel(s) {
        return new SearchModel(s.param, s.query, s.title, s.value);
    }

    fetch(query: PromisesQuery = {}) {
        this.query = parseQuery(query, this.query);
        return this.api.fetch(this.query)
            .then(response => this.updateModels(response));        
    }

    navigate(query: PromisesQuery = {}) {
        return this.fetch(query)
            .then(() => {
                this.pagerModel.navigate = this.navigate.bind(this);
                this.facetModels.forEach(facetModel => facetModel.navigate = this.navigate.bind(this));
                this.searchModel.search = this.navigate.bind(this);
            })
            .then(() => this.updateUrl());
    }

    updateModels(response: PromisesResponse) {
        this.tableModel = new PromisesModel(response.results);
        this.facetModels = response.navigators
            .filter(nav => nav.type.facet)
            .map(nav => this.createFacetModel(nav));
        this.pagerModel = this.createPagerModel(response);
        this.searchModel = this.createSearchModel(response.navigators[0])
    }

    updateUrl() {
        this.router.navigateToRoute('promises', this.query);
    }
}