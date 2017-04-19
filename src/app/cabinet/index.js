import angular from 'angular';
import uiRouter from 'angular-ui-router';

import router from './cabinet.router';

import UsersCtrl from './users/users.controller';
import User from './users/users.factory';

angular.module('avarcom.cabinet', [uiRouter])
  .config(router)

  .controller('UsersCtrl', UsersCtrl)

  .factory('User', User);
