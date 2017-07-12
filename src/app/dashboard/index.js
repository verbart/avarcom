import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';

import router from './dashboard.router';

import mainHeader from '../../components/main-header/main-header.component';
import mainNavbar from '../../components/navbar/navbar.component';
import justCalendar from '../../components/just-calendar/just-calendar.component'
import datePicker from '../../components/date-picker/date-picker.component';
import accidentsMapModal from '../../components/modals/accidents-map/accidents-map.component';
import periodModal from '../../components/modals/period/period.component';
import confirmModal from '../../components/modals/confirm/confirm.component';
import alertModal from '../../components/modals/alert/alert.component';
import notificationSwitcher from '../../components/notification-switcher/notification-switcher.component';
import citySwitcher from '../../components/city-switcher/city-switcher.component';

import DashboardCtrl from './dashboard.controller';
import AccidentListCtrl from './accidents/accidents.controller';
import AccidentReadOneCtrl from './accidents/read-one/read-one.controller';
import AccidentCreateCtrl from './accidents/create/create.controller';
import ClosedListCtrl from './closed/closed.controller';
import ClosedEditCtrl from './closed/edit/edit.controller';
import StatisticsCtrl from './statistics/statistics.controller';
import ProfileLinkCtrl from '../../components/profile-link/profile-link.controller';

import Accident from './accidents/accident.factory';
import Closed from './closed/closed.factory';
import Statistics from './statistics/statistics.factory';

import commissionerValidate from './accidents/create/commissioner-validate.directive';

import 'angular-resource';
import 'angular-tablesort';
import 'ngstorage';
import 'angular-moment';
import 'ui-leaflet';
import 'angular-simple-logger';
import 'angular-messages';
import 'ng-file-upload';
import 'ng-file-upload';
import 'angular-ui-bootstrap';
import 'angular-bootstrap-lightbox';
import 'angular-ui-mask';

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
  'bootstrapLightbox'
])
  .config(router)
  .config(function (LightboxProvider) {
    LightboxProvider.templateUrl = 'views/components/modals/image/image.html';
    LightboxProvider.getImageUrl = function (image) {
      return '//i.imgsafe.org/' + image;
    };
  })

  .component('mainHeader', mainHeader)
  .component('mainNavbar', mainNavbar)
  .component('justCalendar', justCalendar)
  .component('datePicker', datePicker)
  .component('accidentsMapModal', accidentsMapModal)
  .component('periodModal', periodModal)
  .component('confirmModal', confirmModal)
  .component('alertModal', alertModal)
  .component('notificationSwitcher', notificationSwitcher)
  .component('citySwitcher', citySwitcher)

  .directive('commissionerValidate', commissionerValidate)

  .controller('DashboardCtrl', DashboardCtrl)
  .controller('AccidentListCtrl', AccidentListCtrl)
  .controller('AccidentReadOneCtrl', AccidentReadOneCtrl)
  .controller('AccidentCreateCtrl', AccidentCreateCtrl)
  .controller('ClosedListCtrl', ClosedListCtrl)
  .controller('ClosedEditCtrl', ClosedEditCtrl)
  .controller('StatisticsCtrl', StatisticsCtrl)
  .controller('ProfileLinkCtrl', ProfileLinkCtrl)

  .factory('Accident', Accident)
  .factory('Closed', Closed)
  .factory('Statistics', Statistics);
