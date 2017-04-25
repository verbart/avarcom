import angular from 'angular';
import uiRouter from 'angular-ui-router';

import router from './main.router';

import MainCtrl from './main.controller';


angular.module('avarcom.main', [uiRouter])
  .config(router)
  .controller('MainCtrl', MainCtrl);
