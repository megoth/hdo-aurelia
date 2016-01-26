import {HttpClient} from 'aurelia-fetch-client';
import _ from 'lodash';
import 'fetch';
import {constructUrl} from './url';

export class HdoApi {
  constructor(private http: HttpClient, private baseUrl: String) {
    http.configure(config => config.useStandardConfiguration());
  }

  fetch(queries: Object) : Promise {
    return this.http.fetch(constructUrl(this.baseUrl, queries))
    .then(response => response.json());
  }
}