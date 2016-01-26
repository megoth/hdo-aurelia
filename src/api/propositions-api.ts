import {HdoApi} from '../util/hdo-api';
import {HttpClient} from 'aurelia-fetch-client';

export interface PropositionsQuery {
  page?: number;
}

export interface PropositionsResponse {
    current_page: number;
    navigators: Object[];
    next_url: string;
    previous_url: string;
    results: Object[];
    total_pages: number;
}

export class PropositionsApi {
    api: HdoApi;

  constructor(private http: HttpClient) {
    this.api = new HdoApi(http, 'https://www.holderdeord.no/propositions.json');
  }

  fetch(query: PropositionsQuery) {
    return this.api.fetch(query);
  }
}