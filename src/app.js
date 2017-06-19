import angular from 'angular';
import uiRouter from 'angular-ui-router';

import '../node_modules/moment/locale/ru';
import 'leaflet';
import 'slick-carousel';
import 'angular-slick-carousel';
import 'angular-animate';
import 'angularjs-toaster';
import 'intro.js';
import './angular-intro';

import clickOut from './components/click-out.directive';
import decodeBase64 from './components/decode-base64.filter';
import Geocoding from './components/geocoding.service';
import callbackModal from './components/modals/callback/callback.component';
import privacyPolicyModal from './components/modals/privacy-policy/privacy-policy.component';

import './app/main';
import './app/auth';
import './app/dashboard';
import './app/cabinet';

import './sticky'


angular.module('avarcom', [
  'angular-intro',
  uiRouter,
  'slickCarousel',
  'ngAnimate',
  'toaster',
  'sticky',

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
  .component('privacyPolicyModal', privacyPolicyModal)

  .controller('MyController', function ($scope, ngIntroService)  {

    $scope.IntroOptions = {
      steps:[
        {
          element: document.querySelector('#intro-step-1'),
          intro: 'Выберите город в котором будете работать',
          position: 'bottom'
        },
        {
          element: document.querySelector('#intro-step-2'),
          intro: 'Это список последних произошедших аварий',
          position: 'right'
        }
      ],
      showStepNumbers: false,
      showBullets: false,
      exitOnOverlayClick: false,
      exitOnEsc: true,
      nextLabel: 'Далее',
      prevLabel: 'Назад',
      skipLabel: 'Пропустить обзор',
      doneLabel: 'Завершить'
    };

    // $scope.clearAndStartNewIntro = function(){
      ngIntroService.clear();
      ngIntroService.setOptions($scope.IntroOptions);

      ngIntroService.onComplete(function(){
        console.log('update some cookie or localstorage.')
      });

      ngIntroService.onExit(function(){
        console.log("[service] exit");
      });

      ngIntroService.onBeforeChange(function(){
        console.log("[service] before change");
      });

      ngIntroService.onChange(()=>{
        console.log("[service] on change");
      });

      ngIntroService.onAfterChange(()=>{
        console.log("[service] after Change");
      });

      // ngIntroService.start();
      // setTimeout(() => ngIntroService.start(), 1000)
    // }

  });
