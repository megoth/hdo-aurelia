import {PromisesModel} from '../models/promisesModel';

export class PromisesTable {
    model: PromisesModel;

    activate(model: PromisesModel) {
        this.model = model;
    }
}