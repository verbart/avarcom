import angular from 'angular';
import uiRouter from 'angular-ui-router';

import '../node_modules/moment/locale/ru';
import clickOut from './components/click-out.directive';
import decodeBase64 from './components/decode-base64.filter';

import './app/auth';
import './app/main';
import './app/dashboard';


angular.module('avarcom', [
        uiRouter,

        'avarcom.auth',
        'avarcom.main',
        'avarcom.dashboard'
    ])
    .constant('CONSTANT', {API_URL: 'http://178.63.17.133:8181/api/v2'})

    .config(function($httpProvider, $localStorageProvider, $stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
        $localStorageProvider.setKeyPrefix('avarcom_');

        $locationProvider.html5Mode(true).hashPrefix('!');
        $urlMatcherFactoryProvider.strictMode(false);

        $stateProvider
            .state('404', {
                url: '/404',
                templateUrl: 'views/app/errors/404.html'
            });

        $urlRouterProvider.otherwise('/404');
    })

    .filter('decodeBase64', decodeBase64)
    .directive('clickOut', clickOut);
