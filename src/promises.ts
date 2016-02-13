import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {PromisesApi, PromisesQuery, PromisesResponse} from './api/promises-api';
import _ from 'lodash';
import {PagerModel} from './models/pagerModel';
import {constructLocalUrl} from './util/url';

interface State {
    pagerModel: PagerModel;
    promises: Object[]
}

@inject(HttpClient)
export class Promises {
    api: PromisesApi;
    heading: string = 'Promises';
    pagerModel: PagerModel;

    constructor(private http: HttpClient) {
        this.api = new PromisesApi(http);
    }

    activate(params, routeConfig) {
        const currentPage = parseInt(params.page, 10) || 1;
        return navigatePromises(this.api, null, this.navigateToPage.bind(this), { page: currentPage })
        .then(state => _.extend(this, state))
    }

    navigateToPage(page: number) {
        navigatePromises(this.api, null, this.navigateToPage.bind(this), { page: page })
        .then(state => _.extend(this, state));
        return true;
    }
}

export function navigatePromises(api: PromisesApi, getUrlFn: Function, navigateToPageFn: Function, queries: PromisesQuery) {
    queries = _.extend({
        page: 1
    }, queries || {});
    return api.fetch(queries)
        .then(response => updateState(response, getUrlFn, navigateToPageFn));

    function updateState(response: PromisesResponse, getUrlFn: Function, navigateToPageFn: Function) {
        return {
            promises: response.results,
            pagerModel: new PagerModel(getUrlFn || getUrl, navigateToPageFn, response.current_page, response.total_pages, !!response.next_url, !!response.previous_url)
        };
    }
}

function getUrl(query: Object) : string {
    return constructLocalUrl('promises', query);
}