import {HdoApi} from '../util/hdo-api';
import {HttpClient} from 'aurelia-fetch-client';

export interface PromisesQuery {
  page?: number;
}

export interface PromisesResponse {
  navigators: Object;
  results: Object[];
  next_url?: String;
  previous_url?: String;
  current_page: Number;
  total_pages: Number;
}

export class PromisesApi {
  api: HdoApi;

  constructor(private http: HttpClient) {
    this.api = new HdoApi(http, 'https://www.holderdeord.no/promises.json');
  }

  fetch(queries: PromisesQuery) {
    return this.api.fetch(queries);
  }
}