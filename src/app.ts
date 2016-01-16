import {RouterConfiguration, Router} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Holder de ord admin';
    config.map([
      { route: ['','promises'], name: 'promises',      moduleId: './src/promises',      nav: true, title:'Promises' }
    ]);

    this.router = router;
  }
}