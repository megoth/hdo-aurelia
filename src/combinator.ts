import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client'; 
import {Router} from 'aurelia-router';
import _ from 'lodash';

import {Promises} from './promises';
import {PromisesQuery} from './api/promises-api';
import {Propositions} from './propositions';
import {PropositionsQuery} from './api/propositions-api';
import {encodeQueryAsObject} from './util/url';

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
        return this.navigate(
            params.promises ? JSON.parse(params.promises) : {}, 
            params.propositions ? JSON.parse(params.propositions) : {}
        );
    }

    navigate(promisesQuery: PromisesQuery, propositionsQuery: PropositionsQuery) {
        this.query = {
            promises: _.extend(this.query.promises, promisesQuery),
            propositions: _.extend(this.query.propositions, propositionsQuery)
        };
        return Promise.all([
            this.promises.fetch(this.query.promises)
                .then(() => {
                    this.promises.pagerModel.navigate = this.navigatePromises.bind(this);
                    this.promises.facetModels.forEach(facetModel => facetModel.navigate = this.navigatePromises.bind(this));
                    this.promises.searchModel.search = this.navigatePromises.bind(this);
                }),
            this.propositions.fetch(this.query.propositions)
                .then(() => {
                    this.propositions.pagerModel.navigate = this.navigatePropositions.bind(this);
                    this.propositions.facetModels.forEach(facetModel => facetModel.navigate = this.navigatePropositions.bind(this));
                    this.propositions.searchModel.search = this.navigatePropositions.bind(this);
                })
        ]).then(() => this.updateUrl());
    }

    navigatePromises(query: PromisesQuery) {
        return this.navigate(query, {});
    }

    navigatePropositions(query: PropositionsQuery) {
        return this.navigate({}, query);
    }

    updateUrl() {
        this.router.navigateToRoute('combinator', encodeQueryAsObject(this.query));
    }
}