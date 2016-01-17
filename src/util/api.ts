import {HttpClient} from 'aurelia-fetch-client';
import {Promise} from 'bluebird';

export class Api {
  links: Object;

  constructor(private http: HttpClient) {
    let api = sessionStorage.getItem('api');
    this.links = api ? JSON.parse(api) : {};
    http.configure(config => config.useStandardConfiguration());
  }

  fetch(endpoint: string) {
    let paths = endpoint ? endpoint.split(':') : [];
    return (paths.length === 0 ?
        this.http.fetch('https://www.holderdeord.no/api') :
        (path => this.findLinks(paths, path).then(links => this.http.fetch(links[path].href)))(paths.pop())
      )
      .then(response => response.json())
      .then(response => {
        let apiPath = endpoint ? ['root'].concat(endpoint).join(':') : 'root';
        this.links[apiPath] = response._links;
        sessionStorage.setItem('api', JSON.stringify(this.links));
        return response;
      });
  }

  findLinks(paths: string[], path: string) {
    let apiPath = ['root'].concat(paths).join(':');
    if (this.links[apiPath]) {
      return new Promise(resolve => resolve(this.links[apiPath]));
    }
    return (paths.length === 0 ?
        this.http.fetch('https://www.holderdeord.no/api') :
        (path => this.findLinks(paths, path).then(links => this.http.fetch(links[path].href)))(paths.pop())
      )
      .then(response => response.json())
      .then(response => {
        this.links[apiPath] = response._links;
        return response._links;
      });
  }
}

