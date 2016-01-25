import {RestApi} from '../util/rest-api';
import {HttpClient} from 'aurelia-fetch-client';

export interface PropositionsQuery {
  page?: number;
}

export interface PropositionsResponse {
  _embedded: Object[];
  _links: Object[];
  count: Number;
  total: Number;
  total_pages: Number;
}

export class PropositionsApi {
  api: RestApi;

  constructor(private http: HttpClient) {
    this.api = new RestApi(http, 'https://www.holderdeord.no/promises.json');
  }

  fetch(endpoint: string, data: Object, query: PropositionsQuery) {
    return this.api.fetch(endpoint, data, query);
  }
}