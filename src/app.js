import angular from 'angular';
import uiRouter from 'angular-ui-router';

import '../node_modules/moment/locale/ru';
import '../node_modules/leaflet/dist/leaflet'

import clickOut from './components/click-out.directive';
import decodeBase64 from './components/decode-base64.filter';
import Geocoding from './components/geocoding.service';

import './app/main';
import './app/auth';
import './app/dashboard';
import './app/cabinet';


angular.module('avarcom', [
  uiRouter,

  'avarcom.main',
  'avarcom.auth',
  'avarcom.dashboard',
  'avarcom.cabinet'
])
  .constant('CONSTANT', {
    API_URL: 'https://avarkom.pw/api/v2',
    API_KEY: 'AIzaSyDDQzWP_LrDLwRqPSq9_7FvQf2uzQvSJhU'
  })

  .config(function(
    $localStorageProvider,
    $stateProvider,
    $urlRouterProvider,
    $locationProvider,
    $urlMatcherFactoryProvider
  ) {
    $localStorageProvider.setKeyPrefix('avarcom_');

    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider.state('404', {
      url: '/404',
      templateUrl: 'views/app/errors/404.html'
    });

    $urlRouterProvider.otherwise('/404');
  })

  .filter('decodeBase64', decodeBase64)
  .service('Geocoding', Geocoding)
  .directive('clickOut', clickOut);
