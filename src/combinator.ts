import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client'; 
import {PromisesApi} from './api/promises-api';
import {PropositionsApi} from './api/propositions-api';
import {navigatePromises} from './promises';
import {navigatePropositions} from './propositions';
import _ from 'lodash';
import {constructLocalUrl} from './util/url';
import {PagerModel} from './models/pagerModel';

@autoinject
export class Combinator {
    heading: string = 'Kombinér Løfter og Forslag';
    promises: Object;
    promisesApi: PromisesApi;
    promisesQuery: Object;
    propositions: Object;
    propositionsApi: PropositionsApi;
    propositionsQuery: Object;

    constructor(private http: HttpClient) {
        this.promisesApi = new PromisesApi(http);
        this.propositionsApi = new PropositionsApi(http);
    }

    activate(params, routeConfig) {
        this.promisesQuery = params.promises ? JSON.parse(params.promises) : {};
        this.propositionsQuery = params.propositions ? JSON.parse(params.propositions) : {};
        Promise.all([
            navigatePromises(this.promisesApi, getPromisesUrl(this), navigateToPromisesPage.bind(this), this.promisesQuery),
            navigatePropositions(this.propositionsApi, getPropositionsUrl(this), navigateToPropositionsPage.bind(this), this.propositionsQuery)
        ])
            .then(response => {
                this.promises = response[0];
                this.propositions = response[1];
            });
    }
}

// promises
function navigateToPromisesPage(page: number) {
    navigatePromises(this.promisesApi, getPromisesUrl(this), navigateToPromisesPage.bind(this), { page })
        .then(promisesState => this.promises = promisesState)
        .then(() => {
            var propositions = this.propositions;
            this.propositions = null;
            return new Promise(response => response(propositions));
        })
        .then(propositions => this.propositions = propositions);
    return true;
}

function getPromisesUrl(combinator) {
    return query => {
        return constructLocalUrl('combinator', {
            promises: query,
            propositions: combinator.propositionsQuery
        });
    };
}

// propositions
function navigateToPropositionsPage(page: number) {
    this.propositionsQuery = { page: page };
    navigatePropositions(this.propositionsApi, getPropositionsUrl(this), navigateToPropositionsPage.bind(this), this.propositionsQuery)
        .then(propositionsState => this.propositions = propositionsState);
    return true;
}

function getPropositionsUrl(combinator) {
    return query => {
        return constructLocalUrl('combinator', {
            promises: combinator.promisesQuery,
            propositions: query
        });
    };
}