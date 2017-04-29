import angular from 'angular';
import uiRouter from 'angular-ui-router';

import router from './cabinet.router';
import 'angularjs-dropdown-multiselect';

import UsersCtrl from './users/users.controller';
import newUserModal from '../../components/modals/new-user/new-user.component';
import User from './users/users.factory';

angular.module('avarcom.cabinet', [
  uiRouter,
  'angularjs-dropdown-multiselect'
])
  .config(router)

  .controller('UsersCtrl', UsersCtrl)

  .component('newUserModal', newUserModal)

  .factory('User', User);
