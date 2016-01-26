import {HdoApi} from '../util/hdo-api';
import {HttpClient} from 'aurelia-fetch-client';

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

  constructor(private http: HttpClient) {
    this.api = new HdoApi(http, 'https://www.holderdeord.no/promises.json');
  }

  fetch(queries: PromisesQuery) {
    return this.api.fetch(queries);
  }
}