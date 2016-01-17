import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {Router} from 'aurelia-router';
import {Api} from './util/api';

@autoinject
export class Promises {
  api: Api;
  currentPage: number = 1;
  heading: string = 'Promises';
  links: Object;
  pages: number[] = [1];
  pageSize: number = 10;
  promises: any[] = [];
  totalPages: number = 1;

  constructor(private http: HttpClient) {
    this.api = new Api(http);
  }

  activate(params, routeConfig) {
    this.currentPage = parseInt(params.page, 10) || 1;
    return this.navigate(`promises?page=${this.currentPage}`);
  }

  navigate(url: string) {
    return this.api.fetch('promises')
      .then(response => {
        this.links = response._links;
        this.promises = response._embedded.promises;
        this.totalPages = Math.ceil(response.total / this.pageSize);
        let firstPage = Math.max(this.currentPage - 2, 1);
        let lastPage = Math.min(this.currentPage + 2, this.totalPages);
        this.pages = [];
        for (let i = firstPage; i <= lastPage; i++) {
          this.pages.push(i);
        }
        return response;
      });
  }

  navigateToPage(page: number) {
    this.currentPage = page;
    this.navigate(`promises?page=${this.currentPage}`);
    return true;
  }
}