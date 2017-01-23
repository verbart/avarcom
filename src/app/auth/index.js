import angular from 'angular';
import uiRouter from 'angular-ui-router';

import router from './auth.router';
import AuthToken from './auth-token.factory';
import AuthInterceptor from './auth-interceptor.factory';
import AuthService from './auth.service';
import LoginCtrl from './login/login.controller';


export default angular.module('avarcom.auth', [uiRouter, 'ngStorage'])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    })
    .run(function($rootScope, AuthToken, $state) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if(toState.authenticate && !AuthToken.get()) {
                event.preventDefault();
                $state.go('login');
            }
        });
    })
    .config(router)
    .service('AuthService', AuthService)
    .factory('AuthToken', AuthToken)
    .factory('AuthInterceptor', AuthInterceptor)
    .controller('LoginCtrl', LoginCtrl);
