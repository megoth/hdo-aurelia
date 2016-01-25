import {RouterConfiguration, Router} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Holder de ord admin';
    config.map([
      { route: [''],             name: 'dashboard',     moduleId: './src/dashboard',     nav: true, title: 'Dashboard' },
      { route: ['propositions'], name: 'propositions',  moduleId: './src/propositions',  nav: true, title: 'Propositions' },
      { route: ['promises'],     name: 'promises',      moduleId: './src/promises',      nav: true, title: 'Promises' },
    ]);

    this.router = router;
  }
}