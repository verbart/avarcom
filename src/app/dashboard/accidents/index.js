import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';

import router from './accidents.router';

import justCalendar from '../../../components/just-calendar/just-calendar.component'
import datePicker from '../../../components/date-picker/date-picker.component';
import accidentsMapModal from '../../../components/modals/accidents-map/accidents-map.component';

import AccidentListCtrl from './accidents.controller';
import AccidentReadOneCtrl from './read-one/read-one.controller';
import AccidentCreateCtrl from './create/create.controller';

import Accident from './accident.factory';

import commissionerValidate from './create/commissioner-validate.directive';

import 'angular-resource';
import 'ngstorage';
import 'angular-moment';
import 'ui-leaflet';
import 'angular-simple-logger';
import 'angular-messages';
import 'angular-ui-bootstrap';


angular.module('avarcom.dashboard.accidents', [
  uiRouter,
  ngResource,
  'ngMessages',
  'angularMoment',
  'ui.bootstrap',
  'ngStorage',
  'ui-leaflet',
  'nemLogging'
])
  .config(router)

  .component('justCalendar', justCalendar)
  .component('datePicker', datePicker)
  .component('accidentsMapModal', accidentsMapModal)

  .directive('commissionerValidate', commissionerValidate)

  .controller('AccidentListCtrl', AccidentListCtrl)
  .controller('AccidentReadOneCtrl', AccidentReadOneCtrl)
  .controller('AccidentCreateCtrl', AccidentCreateCtrl)

  .factory('Accident', Accident);
