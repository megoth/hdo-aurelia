import _ from 'lodash';

export interface IPager {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  pages: number[];
  totalPages: number;
  getUrl: Function;
}

export class Pager implements IPager {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  pages: number[];
  totalPages: number;
  getUrl: Function;

  activate(model: IPager) {
    _.extend(this, model);
  }
}