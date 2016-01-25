import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {Router} from 'aurelia-router';
import {Api} from './util/api';
import _ from 'lodash';

interface PropositionsQueries {
  page?: number;
}

@autoinject
export class Propositions {
  api: Api;
  currentPage: number = 1;
  heading: string = 'Propositions';
  links: Object;
  pages: number[] = [1];
  pageSize: number = 10;
  propositions: any[] = [];
  totalPages: number = 1;

  constructor(private http: HttpClient) {
    this.api = new Api(http);
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

function navigate(queries: PropositionsQueries) {
  queries = _.extend({
    page: 1
  }, queries || {});
  return this.api.fetch('propositions', {}, queries)
    .then(updateTable.bind(this, queries));
}

function updateTable(queries: PropositionsQueries, response) {
  this.currentPage = queries.page;
  this.links = response._links;
  this.propositions = response._embedded.propositions;
  this.totalPages = Math.ceil(response.total / this.pageSize);
  let firstPage = Math.max(this.currentPage - 2, 1);
  let lastPage = Math.min(this.currentPage + 2, this.totalPages);
  this.pages = [];
  for (let i = firstPage; i <= lastPage; i++) {
    this.pages.push(i);
  }
  return response;
}