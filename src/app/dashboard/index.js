import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';

import router from './dashboard.router';

import sidebar from '../../components/sidebar/sidebar.component';
import justCalendar from '../../components/just-calendar/just-calendar.component';
import datePicker from '../../components/date-picker/date-picker.component';
import accidentsMapModal from '../../components/modals/accidents-map/accidents-map.component';
import periodModal from '../../components/modals/period/period.component';
import confirmModal from '../../components/modals/confirm/confirm.component';

import AccidentListCtrl from './accidents/accidents.controller';
import AccidentReadOneCtrl from './accidents/read-one/read-one.controller';
import AccidentCreateCtrl from './accidents/create/create.controller';
import ClosedListCtrl from './closed/closed.controller';
import ClosedEditCtrl from './closed/edit/edit.controller';
import StatisticsCtrl from './statistics/statistics.controller';

import SidebarCalendar from '../../components/sidebar/sidebar-calendar.factory';
import Accident from './accidents/accident.factory';
import Closed from './closed/closed.factory';
import Statistics from './statistics/statistics.factory';

import commissionerValidate from './accidents/create/commissioner-validate.directive';

import dropdownsCustomTemplate from '../../components/dropdowns-custom-template';

import 'angular-resource';
import 'angular-tablesort';
import 'ngstorage';
import 'angular-moment';
import 'ui-leaflet';
import 'angular-simple-logger';
import 'angular-dropdowns';
import 'angular-messages';
import 'ng-file-upload';
import 'ng-file-upload';
import 'angular-modal-service';
import 'angular-ui-bootstrap';
import 'angular-bootstrap-lightbox';

angular.module('avarcom.dashboard', [
  uiRouter,
  ngResource,
  'ngMessages',
  'ngDropdowns',
  'angularMoment',
  'tableSort',
  'ui.bootstrap',
  'ngStorage',
  'ui-leaflet',
  'nemLogging',
  'ngFileUpload',
  'bootstrapLightbox'
])
  .run(dropdownsCustomTemplate)

  .config(router)
  .config(function (LightboxProvider) {
    LightboxProvider.templateUrl = 'views/components/modals/image/image.html';
    LightboxProvider.getImageUrl = function (image) {
      return '//i.imgsafe.org/' + image;
    };
  })

  .component('avarcomSidebar', sidebar)
  .component('justCalendar', justCalendar)
  .component('datePicker', datePicker)
  .component('accidentsMapModal', accidentsMapModal)
  .component('periodModal', periodModal)
  .component('confirmModal', confirmModal)

  .directive('commissionerValidate', commissionerValidate)

  .controller('AccidentListCtrl', AccidentListCtrl)
  .controller('AccidentReadOneCtrl', AccidentReadOneCtrl)
  .controller('AccidentCreateCtrl', AccidentCreateCtrl)
  .controller('ClosedListCtrl', ClosedListCtrl)
  .controller('ClosedEditCtrl', ClosedEditCtrl)
  .controller('StatisticsCtrl', StatisticsCtrl)

  .factory('SidebarCalendar', SidebarCalendar)
  .factory('Accident', Accident)
  .factory('Closed', Closed)
  .factory('Statistics', Statistics);
