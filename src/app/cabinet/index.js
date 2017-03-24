import angular from 'angular';
import uiRouter from 'angular-ui-router';

import router from './cabinet.router';

import CommissionersCtrl from './commissioners/commissioners.controller';
import Commissioner from './commissioners/commissioner.factory';

angular.module('avarcom.cabinet', [uiRouter])
  .config(router)

  .controller('CommissionersCtrl', CommissionersCtrl)

  .factory('Commissioner', Commissioner);
