import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';

import router from './dashboard.router';

import mainHeader from '../../components/main-header/main-header.component';
import mainNavbar from '../../components/navbar/navbar.component';
import notificationSwitcher from '../../components/notification-switcher/notification-switcher.component';
import citySwitcher from '../../components/city-switcher/city-switcher.component';

import DashboardCtrl from './dashboard.controller';
import StatisticsCtrl from './statistics/statistics.controller';
import ProfileLinkCtrl from '../../components/profile-link/profile-link.controller';

import Statistics from './statistics/statistics.factory';

import 'angular-resource';
import 'angular-tablesort';
import 'ngstorage';
import 'angular-moment';
import 'ui-leaflet';
import 'angular-simple-logger';
import 'angular-messages';
import 'ng-file-upload';
import 'angular-ui-bootstrap';
import 'angular-bootstrap-lightbox';
import 'angular-ui-mask';

import './accidents';
import './closed';
import './moderation';


angular.module('avarcom.dashboard', [
  uiRouter,
  ngResource,
  'ngMessages',
  'angularMoment',
  'tableSort',
  'ui.bootstrap',
  'ngStorage',
  'ui-leaflet',
  'ui.mask',
  'nemLogging',
  'ngFileUpload',
  'bootstrapLightbox',

  'avarcom.dashboard.accidents',
  'avarcom.dashboard.closed',
  'avarcom.dashboard.moderation'
])
  .config(router)

  .component('mainHeader', mainHeader)
  .component('mainNavbar', mainNavbar)
  .component('notificationSwitcher', notificationSwitcher)
  .component('citySwitcher', citySwitcher)

  .controller('DashboardCtrl', DashboardCtrl)
  .controller('StatisticsCtrl', StatisticsCtrl)
  .controller('ProfileLinkCtrl', ProfileLinkCtrl)

  .factory('Statistics', Statistics);
