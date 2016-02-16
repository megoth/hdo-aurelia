import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client'; 
import _ from 'lodash';

import {PromisesApi, PromisesQuery} from './api/promises-api';
import {PropositionsApi, PropositionsQuery} from './api/propositions-api';
import {PromisesModel} from './models/promisesModel';
import {PropositionsModel} from './models/propositionsModel';

@autoinject
export class Combinator {
    heading: string = 'Kombinér Løfter og Forslag';
    promisesApi: PromisesApi;
    propositionsApi: PropositionsApi;
    combinatorQuery: {
        promises: PromisesQuery,
        propositions: PropositionsQuery
    };
    promises: {
        tableModel: PromisesModel
    };
    propositions: {
        tabelModel: PropositionsModel
    }

    constructor(private http: HttpClient) {
        this.promisesApi = new PromisesApi(http);
        this.propositionsApi = new PropositionsApi(http);
        this.combinatorQuery = { promises: {}, propositions: {} };
    }

    activate(params, routeConfig) {
    }
}