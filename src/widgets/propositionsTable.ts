import {PropositionsModel} from './models/propositionsModel';

export class PropositionTable {
    model: PropositionsModel;

    activate(model: PropositionsModel) {
        this.model = model;
    }
}