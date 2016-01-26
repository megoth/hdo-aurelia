import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {PromisesApi, PromisesQuery, PromisesResponse} from './api/promises-api';
import _ from 'lodash';

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
    return navigate(this.api, { page: this.currentPage })
    .then(state => _.extend(this, state));
  }

  navigateToPage(page: number) {
    navigate(this.api, { page: page })
    .then(state => _.extend(this, state));
    return true;
  }
}

function navigate(api: PromisesApi, queries: PromisesQuery) {
  queries = _.extend({
    page: 1
  }, queries || {});
  return api.fetch(queries)
  .then(response => updateTable(response));
}

function updateTable(response: PromisesResponse) {
  const promises = response.results;
  const currentPage = response.current_page;
  const nextUrl = response.next_url;
  const prevUrl = response.previous_url;
  const totalPages = response.total_pages;
  const firstPage = Math.max(currentPage - 2, 1);
  const lastPage = Math.min(currentPage + 2, totalPages);
  let pages = [];
  for (let i = firstPage; i <= lastPage; i++) {
    pages.push(i);
  }
  return {
    promises,
    currentPage,
    nextUrl,
    prevUrl,
    totalPages,
    firstPage,
    lastPage,
    pages
  };
}