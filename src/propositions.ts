import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {PropositionsApi, PropositionsQuery, PropositionsResponse} from './api/propositions-api';
import {PagerData} from '../widgets/pager';
import _ from 'lodash';

interface State {
    pager: PagerData;
    propositions: Object[];
}

@autoinject
export class Propositions {
    api: PropositionsApi;
    pager: PagerData;
    heading: string = 'Propositions';
    propositions: Object[] = [];

    constructor(private http: HttpClient) {
        this.api = new PropositionsApi(http);
    }

    activate(params, routeConfig) {
        this.currentPage = parseInt(params.page, 10) || 1;
        return navigate(this.api, 'propositions', { page: this.currentPage })
        .then(state => _.extend(this, state));
    }

    navigateToPage(page: number) : boolean {
        navigate(this.api, 'propositions', { page: page })
        .then(state => _.extend(this, state));
        return true;
    }
}

function navigate(api: PropositionsApi, stateName: string, query: PropositionsQuery) : Promise<State> {
    query = _.extend({
        page: 1
    }, query || {});
    return api.fetch(query)
    .then(response => generateState(response, stateName));
}

function generateState(response: PropositionsResponse, stateName: string): State {
    const currentPage = response.current_page;
    const totalPages = response.total_pages;
    const firstPage = Math.max(currentPage - 2, 1);
    const lastPage = Math.min(currentPage + 2, totalPages);
    let pages = [];
    for (let i = firstPage; i <= lastPage; i++) {
        pages.push(i);
    }
    return {
        propositions: response.results,
        pager: {
            currentPage,
            hasNext: !!response.next_url,
            hasPrevious: !!response.previous_url,
            totalPages,
            pages,
            stateName: stateName
        }
    };
}