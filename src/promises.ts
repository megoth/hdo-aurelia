import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {Router} from 'aurelia-router';
import {RestApi} from './util/restApi';
import _ from 'lodash';

interface PromisesQueries {
  page?: number;
}

@autoinject
export class Promises {
  api: RestApi;
  currentPage: number = 1;
  heading: string = 'Promises';
  links: Object;
  pages: number[] = [1];
  pageSize: number = 10;
  promises: any[] = [];
  totalPages: number = 1;

  constructor(private http: HttpClient) {
    this.api = new RestApi(http, 'https://www.holderdeord.no/api');
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

function navigate(queries: PromisesQueries) {
  queries = _.extend({
    page: 1
  }, queries || {});
  return this.api.fetch('promises', {}, queries)
  .then(updateTable.bind(this, queries));
}

function updateTable(queries: PromiseQueries, response) {
  this.currentPage = queries.page;
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
}