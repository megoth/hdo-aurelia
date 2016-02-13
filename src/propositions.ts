import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {PropositionsApi, PropositionsQuery, PropositionsResponse} from './api/propositions-api';
import {PagerModel} from './models/pagerModel';
import _ from 'lodash';
import {constructLocalUrl} from './util/url';

interface State {
    pagerModel: PagerModel;
    propositions: Object[];
}

@autoinject
export class Propositions {
    api: PropositionsApi;
    pagerModel: PagerModel;
    heading: string = 'Propositions';
    propositions: Object[] = [];

    constructor(private http: HttpClient) {
        this.api = new PropositionsApi(http);
    }

    activate(params, routeConfig) {
        const currentPage = parseInt(params.page, 10) || 1;
        return navigatePropositions(this.api, null, this.navigateToPage.bind(this), { page: currentPage })
        .then(state => _.extend(this, state));
    }

    navigateToPage(page: number) : boolean {
        navigatePropositions(this.api, null, this.navigateToPage.bind(this), { page: page })
        .then(state => _.extend(this, state));
        return true;
    }
}

export function navigatePropositions(api: PropositionsApi, getUrlFn: Function, navigateToPageFn: Function, query: PropositionsQuery): Promise<State> {
    query = _.extend({
        page: 1
    }, query || {});
    return api.fetch(query)
        .then(response => updateState(response, getUrlFn, navigateToPageFn));

    function updateState(response: PropositionsResponse, getUrlFn: Function, navigateToPageFn: Function): State {
        return {
            propositions: response.results,
            pagerModel: new PagerModel(getUrlFn || getUrl, navigateToPageFn, response.current_page, response.total_pages, !!response.next_url, !!response.previous_url)
        };
    }
}

function getUrl(query: Object) {
    return constructLocalUrl('propositions', query);
}