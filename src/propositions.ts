import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import _ from 'lodash';

import {PropositionsApi, PropositionsQuery, PropositionsResponse} from './api/propositions-api';
import {FacetModel} from './models/facetModel';
import {PagerModel} from './models/pagerModel';
import {PropositionsModel} from './models/propositionsModel';
import {SearchModel} from './models/searchModel';
import {constructLocalUrl, parseQuery} from './util/url';

@inject(HttpClient, Router)
export class Propositions {
    api: PropositionsApi;
    heading: string = 'Propositions';
    pagerModel: PagerModel;
    facetModels: FacetModel[];
    tableModel: PropositionsModel;
    searchModel: SearchModel;
    query: PropositionsQuery;

    constructor(private http: HttpClient, private router: Router) {
        this.api = new PropositionsApi(http);
        this.query = { page: 1 };
    }

    activate(params, routeConfig) {
        return this.navigate(params);
    }

    // methods
    createFacetModel(f) {
        return new FacetModel(f.param, f.terms, f.title);
    }

    createPagerModel(r: PropositionsResponse) {
        return new PagerModel(r.current_page, r.total_pages, !!r.next_url, !!r.previous_url);
    }

    createSearchModel(s) {
        return new SearchModel(s.param, s.query, s.title, s.value);
    }

    fetch(query: PropositionsQuery) {
        this.query = parseQuery(query, this.query);
        return this.api.fetch(this.query)
            .then(response => this.updateModels(response));
    }

    navigate(query: PropositionsQuery) {
        return this.fetch(query)
            .then(() => {
                this.pagerModel.navigate = this.navigate.bind(this);
                this.facetModels.forEach(facetModel => facetModel.navigate = this.navigate.bind(this));
                this.searchModel.search = this.navigate.bind(this);
            })
            .then(() => this.updateUrl());
    }

    updateModels(response: PropositionsResponse) {
        this.tableModel = new PropositionsModel(response.results);
        this.facetModels = response.navigators
            .filter(nav => nav.type.facet)
            .map(nav => this.createFacetModel(nav));
        this.pagerModel = this.createPagerModel(response);
        this.searchModel = this.createSearchModel(response.navigators[0])
    }

    updateUrl() {
        this.router.navigateToRoute('propositions', this.query);
    }
}