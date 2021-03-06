import {PagerModel} from '../models/pagerModel';

export class Pager {
  model: PagerModel;

  activate(model) {
    this.model = model;
  }

  navigate(page: Number) {
    this.model.navigate({page});
  }
}