import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client'; 
import {Router} from 'aurelia-router';
import _ from 'lodash';

import {Promises} from './promises';
import {PromisesQuery} from './api/promises-api';
import {Propositions} from './propositions';
import {PropositionsQuery} from './api/propositions-api';
import {constructLocalUrl, parseQuery} from './util/url';

@inject(HttpClient, Router)
export class Combinator {
    heading: string = 'Kombinér Løfter og Forslag';
    query: {
        promises: PromisesQuery,
        propositions: PropositionsQuery
    };
    promises: Promises;
    propositions: Propositions

    constructor(private http: HttpClient, private router: Router) {
        this.promises = new Promises(http, router);
        this.propositions = new Propositions(http, router);
        this.query = { promises: { page: 1 }, propositions: { page: 1 } };
    }

    activate(params, routeConfig) {
        this.promises.fetch().then(() => console.log(this.promises));
    }
}