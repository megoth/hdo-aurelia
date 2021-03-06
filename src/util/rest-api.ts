import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

export class RestApi {
  links: Object;
  baseUri: String;

  constructor(private http: HttpClient, baseUri: String) {
    let api = sessionStorage.getItem('api');
    this.links = api ? JSON.parse(api) : {};
    http.configure(config => config.useStandardConfiguration());
    this.baseUri = baseUri;
  }

  fetch(endpoint: string, data: Object, queries: Object) {
    let paths = endpoint ? endpoint.split(':') : [];
    return (paths.length === 0 ?
      this.http.fetch(constructUrl(this.baseUri, data, queries)) :
      (path => this.findLinks(paths)
        .then(links => this.http.fetch(constructUrl(links[path].href, data, queries)))
        )(paths.pop())
        )
    .then(response => response.json())
    .then(response => {
      let apiPath = endpoint ? ['root'].concat(endpoint).join(':') : 'root';
      this.links[apiPath] = response._links;
      sessionStorage.setItem('api', JSON.stringify(this.links));
      return response;
    });
  }

  findLinks(paths: string[]) {
    let apiPath = ['root'].concat(paths).join(':');
    if (this.links[apiPath]) {
      return new Promise(resolve => resolve(this.links[apiPath]));
    }
    return (paths.length === 0 ?
      this.http.fetch(this.baseUri) :
      (path => this.findLinks(paths)
        .then(links => this.http.fetch(links[path].href))
        )(paths.pop())
        )
    .then(response => response.json())
    .then(response => {
      this.links[apiPath] = response._links;
      return response._links;
    });
  }
}

function constructUrl(baseUrl, data, queries) {
  let query = _.reduce(queries || {}, (memo, value, key) => {
    memo.push(`${key}=${value}`);
    return memo;
  }, []).join('&');
  return `${baseUrl}?${query}`;
}