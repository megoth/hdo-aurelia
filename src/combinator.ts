import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client'; 
import {PromisesApi} from './api/promises-api';
import {PropositionsApi} from './api/propositions-api';
// import {IState as IPromisesState, navigate as navigatePromises} from './promises';
// import {IState as IPropositionsState} from './propositions';
import _ from 'lodash';
// import {constructStateUrl} from './util/url';

// interface IState {
//     promises: IPromisesState;
//     propositions: IPropositionsState;
// }

@autoinject
export class Combinator implements IState {
    heading: string = 'Combine promises and propositions';
    promisesApi: PromisesApi;
    // promises: IPromisesState;
    propositionsApi: PropositionsApi;
    // propositions: IPropositionsState;

    constructor(private http: HttpClient) {
        this.promisesApi = new PromisesApi(http);
        this.propositionsApi = new PropositionsApi(http);
    }

    activate() {
        // navigatePromises(this.promisesApi)
        // .then(promises => {
        //     promises.pager.getUrl = getPromisesUrl;
        //     this.promises = promises;
        // });
    }

    navigateToPage(page: number) {
        console.log(page);
        return true;
    }
}

function getPromisesUrl(query: Object) {
    return constructStateUrl('combinator', {
        promises: query
    });
}