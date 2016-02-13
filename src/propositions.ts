import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {PropositionsApi, PropositionsQuery, PropositionsResponse} from './api/propositions-api';
import {PagerModel} from './models/pagerModel';
import _ from 'lodash';
import {constructLocalUrl} from './util/url';
import {FacetModel} from './models/facetModel';
import {SearchModel} from './models/searchModel';
import {PropositionsModel} from './models/propositionsModel';

@autoinject
export class Propositions {
    api: PropositionsApi;
    heading: string = 'Propositions';
    pagerModel: PagerModel;
    facetModels: FacetModel[];
    tableModel: PropositionsModel;
    searchModel: SearchModel;

    constructor(private http: HttpClient) {
        this.api = new PropositionsApi(http);
    }

    activate(params, routeConfig) {
        const currentPage = parseInt(params.page, 10) || 1;
        return this.navigate({ page: currentPage });
    }

    // methods
    createFacetModel(f) {
        return new FacetModel(this.navigate.bind(this), f.param, f.terms, f.title);
    }

    createPagerModel(r: PropositionsResponse) {
        return new PagerModel(this.navigateToPage.bind(this), r.current_page, r.total_pages, !!r.next_url, !!r.previous_url);
    }

    createSearchModel(s) {
        return new SearchModel(this.navigate.bind(this), s.param, s.query, s.title, s.value);
    }

    navigate(query: PropositionsQuery) {
        return this.api.fetch(_.extend({
            page: 1
        }, query || {}))
            .then(response => this.updateModels(response));
    }

    navigateToPage(page: number) {
        this.navigate({ page: page });
    }

    updateModels(response: PropositionsResponse) {
        this.tableModel = new PropositionsModel(response.results);
        this.facetModels = response.navigators
            .filter(nav => nav.type.facet)
            .map(nav => this.createFacetModel(nav));
        this.pagerModel = this.createPagerModel(response);
        this.searchModel = this.createSearchModel(response.navigators[0])
    }
}