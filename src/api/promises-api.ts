import {HttpClient} from 'aurelia-fetch-client';
import _ from 'lodash';

import {HdoApi} from '../util/hdo-api';
import {flattenQuery} from '../util/url';

export interface PromisesQuery {
  page?: number;
}

export interface PromisesResponse {
  navigators: Object[];
  results: Object[];
  next_url?: string;
  previous_url?: string;
  current_page: number;
  total_pages: number;
}

export class PromisesApi {
  api: HdoApi;
  previousQuery: any[];
  previousResponse: any;

  constructor(private http: HttpClient) {
    this.api = new HdoApi(http, 'https://www.holderdeord.no/promises.json');
    this.previousQuery = [];
  }

  fetch(query: PromisesQuery) {
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