import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {PromisesApi, PromisesQuery, PromisesResponse} from './api/promises-api';

@autoinject
export class Promises {
  api: PromisesApi;
  currentPage: number = 1;
  heading: string = 'Promises';
  nextUrl: string;
  pages: number[] = [1];
  prevUrl: string;
  totalPages: number = 1;

  constructor(private http: HttpClient) {
    this.api = new PromisesApi(http);
  }

  activate(params, routeConfig) {
    this.currentPage = parseInt(params.page, 10) || 1;
    return navigate.call(this, { page: this.currentPage });
  }

  navigateToPage(page: number) {
    navigate.call(this, { page: page });
    return true;
  }
}

function navigate(queries: PromisesQuery) {
  queries = _.extend({
    page: 1
  }, queries || {});
  return this.api.fetch(queries)
    .then(response => updateTable.call(this, response));
}

function updateTable(response: PromisesResponse) {
  this.promises = response.results;
  this.currentPage = response.current_page;
  this.nextUrl = response.next_url;
  this.prevUrl = response.previous_url;
  this.totalPages = response.total_pages;
  const firstPage = Math.max(this.currentPage - 2, 1);
  const lastPage = Math.min(this.currentPage + 2, this.totalPages);
  this.pages = [];
  for (let i = firstPage; i <= lastPage; i++) {
    this.pages.push(i);
  }
  return response;
}