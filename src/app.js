import angular from 'angular';
import uiRouter from 'angular-ui-router';

import '../node_modules/moment/locale/ru';
import '../node_modules/leaflet/dist/leaflet';
import 'slick-carousel';
import 'angular-slick-carousel';
import 'angular-animate';
import 'angularjs-toaster';
import svg4everybody from 'svg4everybody';
if (!IS_DEVELOPMENT) svg4everybody();

import clickOut from './components/click-out.directive';
import decodeBase64 from './components/decode-base64.filter';
import Geocoding from './components/geocoding.service';
import callbackModal from './components/modals/callback/callback.component';
import privacyPolicyModal from './components/modals/privacy-policy/privacy-policy.component';

import './app/main';
import './app/auth';
import './app/dashboard';
import './app/cabinet';


angular.module('avarcom', [
  uiRouter,
  'slickCarousel',
  'ngAnimate',
  'toaster',

  'avarcom.main',
  'avarcom.auth',
  'avarcom.dashboard',
  'avarcom.cabinet'
])
  .constant('CONSTANT', {
    API_URL: 'https://avarkom.pw/api/v2',
    API_URL_V2: 'https://avarkom.pw/control',
    GOOGLE_API_KEY: 'AIzaSyDDQzWP_LrDLwRqPSq9_7FvQf2uzQvSJhU',
    OneSignal: window.OneSignal || []
  })

  .config(function(
    $localStorageProvider,
    $stateProvider,
    $urlRouterProvider,
    $locationProvider,
    $urlMatcherFactoryProvider,
    CONSTANT
  ) {
    $localStorageProvider.setKeyPrefix('avarcom_');

    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider.state('404', {
      url: '/404',
      templateUrl: 'views/app/errors/404.html'
    });

    $urlRouterProvider.otherwise('/404');

    CONSTANT.OneSignal.push(['init', {
      allowLocalhostAsSecureOrigin: true,
      appId: 'd46a0dd4-336f-4586-9d04-e91179e55514',
      autoRegister: false,
      notifyButton: {
        enable: false
      }
    }]);
  })

  .filter('decodeBase64', decodeBase64)
  .service('Geocoding', Geocoding)
  .directive('clickOut', clickOut)

  .component('callbackModal', callbackModal)
  .component('privacyPolicyModal', privacyPolicyModal);
