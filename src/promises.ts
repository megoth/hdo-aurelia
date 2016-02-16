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
        this.query = {};
    }

    activate(params, routeConfig) {
        const currentPage = parseInt(params.page, 10) || 1;
        return this.navigate(params);
    }

    // methods
    createFacetModel(f) {
        return new FacetModel(this.navigate.bind(this), f.param, f.terms, f.title);
    }

    createPagerModel(r: PromisesResponse) {
        return new PagerModel(this.navigateToPage.bind(this), r.current_page, r.total_pages, !!r.next_url, !!r.previous_url);
    }

    createSearchModel(s) {
        return new SearchModel(this.navigate.bind(this), s.param, s.query, s.title, s.value);
    }

    navigate(query: PromisesQuery = {}) {
        _.assignIn(this.query, query);
        _.reduce(this.query, (memo, value, key) => {
            if (value === '') {
                memo.push(key);
            }
            return memo;
        }, [])
            .forEach(key => {
                delete this.query[key];
            });
        return this.api.fetch(this.query)
            .then(response => this.updateModels(response))
            .then(() => this.updateUrl());
    }

    navigateToPage(page: number) {
        this.navigate({ page: page });
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

// function navigatePromises(api: PromisesApi, getUrlFn: Function, navigateToPageFn: Function, queries: PromisesQuery) {
//     queries = _.extend({
//         page: 1
//     }, queries || {});
//     return api.fetch(queries)
//         .then(response => updateState(response, getUrlFn, navigateToPageFn));
// }
// export { navigatePromises };

// function updateState(response: PromisesResponse, getUrlFn: Function, navigateToPageFn: Function) {
//     return {
//         promises: response.results,
//         pagerModel: new PagerModel(getUrlFn || getUrl, navigateToPageFn, response.current_page, response.total_pages, !!response.next_url, !!response.previous_url),
//         searchModel: createSearchModel(response.navigators[0])
//     };
// }

// function search(query: Object) {

// }

// function getUrl(query: Object) : string {
//     return constructLocalUrl('promises', query);
// }