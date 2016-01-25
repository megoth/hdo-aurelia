import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client'; 
import {PromisesApi} from './api/promises-api';
import {PropositionsApi} from './api/propositions-api';

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