import {HttpClient} from 'aurelia-fetch-client';
import _ from 'lodash';
import 'fetch';

export class HdoApi {
  baseUri: String;

  constructor(private http: HttpClient, baseUri: String) {
    http.configure(config => config.useStandardConfiguration());
    this.baseUri = baseUri;
  }

  fetch(queries: Object) {
    return this.http.fetch(constructUri(this.baseUri, queries))
    .then(response => response.json());
  }
}

function constructUri(baseUri: String, queries: Object) {
  let query = _.reduce(queries || {}, (memo, value, key) => {
    memo.push(`${key}=${value}`);
    return memo;
  }, []).join('&');
  return `${baseUri}?${query}`;
}