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
    return navigate(this.api, { page: this.currentPage })
    .then(state => _.extend(this, state));
  }

  navigateToPage(page: number) {
    navigate(this.api, { page: page })
    .then(state => _.extend(this, state));
    return true;
  }
}

function navigate(api: PropositionsApi, query: PropositionsQuery) {
  query = _.extend({
    page: 1
  }, query || {});
  return api.fetch('propositions', {}, query)
    .then(response => processData(query, response));
}

function processData(query: PropositionsQuery, response) {
  const currentPage = query.page;
  const links = response._links;
  const propositions = response._embedded.propositions;
  const totalPages = response.total_pages;
  const firstPage = Math.max(currentPage - 2, 1);
  const lastPage = Math.min(currentPage + 2, totalPages);
  let pages = [];
  for (let i = firstPage; i <= lastPage; i++) {
    pages.push(i);
  }
  return {
    currentPage,
    links,
    propositions,
    totalPages,
    firstPage,
    lastPage,
    pages
  };
}