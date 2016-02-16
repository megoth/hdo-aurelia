import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import {constructLocalUrl} from './util/url';

@inject(Router)
export class Navbar {
    constructor(private router: Router) {
    }

    navigate(route) {
        return !route.isActive;
    }
}