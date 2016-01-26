import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client'; 
import {PromisesApi} from './api/promises-api';
import {PropositionsApi} from './api/propositions-api';
import {State as PromisesState} from './promises';
import {State as PropositionsState} from './propositions';

interface State {
  promises: PromisesState;
  propositions: PropositionsState;
}

@autoinject
export class Combinator {
  heading: string = 'Combine promises and propositions';
  promisesApi: PromisesApi;
  propositionsApi: PropositionsApi;

  constructor(private http: HttpClient) {
    this.promisesApi = new PromisesApi(http);
    this.propositionsApi = new PropositionsApi(http);
  }
}