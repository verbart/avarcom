import angular from 'angular';
import uiRouter from 'angular-ui-router';

import router from './cabinet.router';
import 'angularjs-dropdown-multiselect';

import UsersCtrl from './users/users.controller';
import AccountCtrl from './account/account.controller';

import User from './users/users.factory';
import Account from './account/account.factory';

import newUserModal from '../../components/modals/new-user/new-user.component';

angular.module('avarcom.cabinet', [
  uiRouter,
  'angularjs-dropdown-multiselect'
])
  .config(router)

  .controller('UsersCtrl', UsersCtrl)
  .controller('AccountCtrl', AccountCtrl)

  .component('newUserModal', newUserModal)

  .factory('Account', Account)
  .factory('User', User);
