import angular from 'angular';
import uiRouter from 'angular-ui-router';

import router from './auth.router';
import AuthData from './auth-data.factory';
import AuthInterceptor from './auth-interceptor.factory';
import AuthService from './auth.service';
import LoginCtrl from './login/login.controller';


export default angular.module('avarcom.auth', [uiRouter, 'ngStorage'])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    })
    .run(function($rootScope, AuthData, $state) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if(toState.authenticate && !AuthData.get()) {
                event.preventDefault();
                $state.go('login');
            }
        });
    })
    .config(router)
    .service('AuthService', AuthService)
    .factory('AuthData', AuthData)
    .factory('AuthInterceptor', AuthInterceptor)
    .controller('LoginCtrl', LoginCtrl);
