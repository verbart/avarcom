import angular from 'angular';
import uiRouter from 'angular-ui-router';

import router from './auth.router';
import AuthData from './auth-data.factory';
import AuthToken from './auth-token.factory';
import AuthInterceptor from './auth-interceptor.factory';
import AuthService from './auth.service';
import LoginCtrl from './login/login.controller';


export default angular.module('avarcom.auth', [uiRouter, 'ngStorage'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  })
  .run(function($rootScope, $state, AuthService) {
    // let transitionIsAllowed = false;
    //
    // $rootScope.$on('$stateChangeStart', (event, toState, toParams) => {
    //   console.log(toState, transitionIsAllowed);
    //
    //   if (toState.authenticate && !transitionIsAllowed) {
    //     event.preventDefault();
    //
    //     AuthService.confirmToken().then(response => {
    //       console.log('auth', response);
    //       transitionIsAllowed = true;
    //       $state.go(toState, toParams);
    //     }, error => {
    //       console.log(error);
    //       $state.go('logout');
    //     });
    //   }
    // });
    // $rootScope.$on('$stateChangeSuccess', () => {
    //   transitionIsAllowed = false;
    // });
  })
  .config(router)

  .service('AuthService', AuthService)

  .factory('AuthData', AuthData)
  .factory('AuthToken', AuthToken)
  .factory('AuthInterceptor', AuthInterceptor)

  .controller('LoginCtrl', LoginCtrl);
