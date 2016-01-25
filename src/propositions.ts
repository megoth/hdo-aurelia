import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {PropositionsApi, PropositionsQuery, PropositionsResponse} from './api/propositions-api';
import _ from 'lodash';

@autoinject
export class Propositions {
  api: PropositionsApi;
  currentPage: number = 1;
  heading: string = 'Propositions';
  links: Object;
  pages: number[] = [1];
  pageSize: number = 10;
  propositions: any[] = [];
  totalPages: number = 1;

  constructor(private http: HttpClient) {
    this.api = new PropositionsApi(http);
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

function navigate(query: PropositionsQuery) {
  query = _.extend({
    page: 1
  }, query || {});
  return this.api.fetch('propositions', {}, query)
    .then(updateTable.bind(this, query));
}

function updateTable(query: PropositionsQuery, response: PropositionsResponse) {
  this.currentPage = query.page;
  this.links = response._links;
  this.propositions = response._embedded.propositions;
  this.totalPages = response.total_pages;
  let firstPage = Math.max(this.currentPage - 2, 1);
  let lastPage = Math.min(this.currentPage + 2, this.totalPages);
  this.pages = [];
  for (let i = firstPage; i <= lastPage; i++) {
    this.pages.push(i);
  }
  return response;
}