import {HttpClient} from 'aurelia-fetch-client';
import _ from 'lodash';

import {HdoApi} from '../util/hdo-api';
import {flattenQuery} from '../util/url';

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
  previousQuery: any[];
  previousResponse: any;

  constructor(private http: HttpClient) {
    this.api = new HdoApi(http, 'https://www.holderdeord.no/propositions.json');
    this.previousQuery = [];
  }

  fetch(query: PropositionsQuery) {
    var flattened = flattenQuery(query);
    return _.xor(this.previousQuery, flattened).length > 0 ?
      this.api.fetch(query)
        .then(response => {
          this.previousQuery = flattened;
          this.previousResponse = response;
          return response;
        }) :
      new Promise(resolve => resolve(this.previousResponse));
  }
}