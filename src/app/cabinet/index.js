import angular from 'angular';
import uiRouter from 'angular-ui-router';

import router from './cabinet.router';

angular.module('avarcom.cabinet', [uiRouter])
    .config(router);
