import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {PromisesApi, PromisesQuery, PromisesResponse} from './api/promises-api';
import _ from 'lodash';
import {PagerData} from './widgets/pager';

interface State {
    pager: PagerData;
    promises: Object[]
}

@inject(HttpClient)
export class Promises {
  api: PromisesApi;
  heading: string = 'Promises';
  pager: PagerData;

  constructor(private http: HttpClient) {
    this.api = new PromisesApi(http);
  }

  activate(params, routeConfig) {
    const currentPage = parseInt(params.page, 10) || 1;
    return navigate(this.api, 'promises', { page: currentPage })
        .then(state => _.extend(this, state));
  }

  navigateToPage(page: number) {
    navigate(this.api, 'promises', { page: page })
    .then(state => _.extend(this, state));
    return true;
  }
}

function navigate(api: PromisesApi, stateName: string, queries: PromisesQuery) {
  queries = _.extend({
    page: 1
  }, queries || {});
  return api.fetch(queries)
  .then(response => updateState(response, stateName));
}

function updateState(response: PromisesResponse, stateName: string) : State {
  const currentPage = response.current_page;
  const totalPages = response.total_pages;
  const firstPage = Math.max(currentPage - 2, 1);
  const lastPage = Math.min(currentPage + 2, totalPages);
  let pages = [];
  for (let i = firstPage; i <= lastPage; i++) {
    pages.push(i);
  }
  return {
      promises: response.results,
    pager: {
      currentPage,
      hasNext: !!response.next_url,
      hasPrevious: !!response.previous_url,
      totalPages,
      pages,
      stateName: stateName
    }
  };
}