import angular from 'angular';
import uiRouter from 'angular-ui-router';

import '../node_modules/moment/locale/ru';
import '../node_modules/leaflet/dist/leaflet';
import 'slick-carousel';
import 'angular-slick-carousel';
import 'jquery-sticky';
import 'angular-sticky-plugin';

setTimeout(()=> {
  $("#sticker").sticky({topSpacing:0});
}, 5000);

import clickOut from './components/click-out.directive';
import decodeBase64 from './components/decode-base64.filter';
import Geocoding from './components/geocoding.service';

import './app/main';
import './app/auth';
import './app/dashboard';
import './app/cabinet';


angular.module('avarcom', [
  uiRouter,
  'slickCarousel',
  'hl.sticky',

  'avarcom.main',
  'avarcom.auth',
  'avarcom.dashboard',
  'avarcom.cabinet'
])
  .constant('CONSTANT', {
    API_URL: 'https://avarkom.pw/control',
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

var OneSignal = window.OneSignal || [];
OneSignal.push(["init", {
  appId: "d46a0dd4-336f-4586-9d04-e91179e55514",
  autoRegister: false, /* Set to true to automatically prompt visitors */
  subdomainName: 'SUBDOMAIN_NAME_SEE_STEP_1.4',
  /*
   subdomainName: Use the value you entered in step 1.4: http://imgur.com/a/f6hqN
   */
  httpPermissionRequest: {
    enable: true
  },
  notifyButton: {
    enable: true /* Set to false to hide */
  }
}]);
