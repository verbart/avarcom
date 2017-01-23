import angular from 'angular';
import uiRouter from 'angular-ui-router';

import router from './main.router';

angular.module('avarcom.main', [uiRouter])
    .config(router);
