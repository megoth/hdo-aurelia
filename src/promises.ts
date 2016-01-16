import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {Router} from 'aurelia-router';

@autoinject
export class Promises {
  heading: string = 'Promises';
  promises: any[] = [];
  pages: number[] = [1];
  pageSize: number = 10;
  totalPages: number = 1;
  currentPage: number = 1;
  links: Object;

  constructor(private http: HttpClient) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://www.holderdeord.no/api/');
    });
  }

  activate(params, routeConfig) {
    this.currentPage = parseInt(params.page, 10) || 1;
    return this.navigate(`promises?page=${this.currentPage}`);
  }

  navigate(url: string) {
    return this.http.fetch(url)
      .then(response => response.json())
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
      });
  }

  navigateToPage(page: number) {
    this.currentPage = page;
    this.navigate(`promises?page=${this.currentPage}`);
    return true;
  }
}