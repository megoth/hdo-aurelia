import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client'; 
import {PromisesApi} from './api/promises-api';
import {PropositionsApi} from './api/propositions-api';
import {navigate as navigatePromises} from './promises';
import _ from 'lodash';
import {constructLocalUrl} from './util/url';

@autoinject
export class Combinator {
    heading: string = 'Kombinér Løfter og Forslag';
    promisesApi: PromisesApi;
    promises: Object;
    propositionsApi: PropositionsApi;

    constructor(private http: HttpClient) {
        this.promisesApi = new PromisesApi(http);
        this.propositionsApi = new PropositionsApi(http);
    }

    activate(params, routeConfig) {
        var promises = JSON.parse(params.promises);
        return navigatePromises(this.promisesApi, getPromisesUrl, navigateToPromisesPage.bind(this), promises)
        .then(promisesState => this.promises = promisesState);
    }
}

function getPromisesUrl(query: Object) {
    return constructLocalUrl('combinator', {
        promises: query
    });
}

function navigateToPromisesPage(page: number) {
    navigatePromises(this.promisesApi, getPromisesUrl, navigateToPromisesPage.bind(this), { page: page })
        .then(promisesState => this.promises = promisesState);
    return true;
}