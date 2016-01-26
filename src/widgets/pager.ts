import _ from 'lodash';
import {constructStateUrl} from '../util/url';

export interface PagerData {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  pages: number[];
  totalPages: number;
  stateName: string;
}

export class Pager {
  stateName: string;
  
  activate(model: PagerData) {
    _.extend(this, model);
  }

  getUrl(query: Object) {
    return constructStateUrl(this.stateName, query);
  }
}