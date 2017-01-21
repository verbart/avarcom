import angular from 'angular';

import router from './routes';

import sidebar from './components/sidebar';
import justCalendar from './components/justCalendar';
import datePicker from './components/datePicker';

import AccidentListCtrl from './controllers/accidents/AccidentListCtrl';
import AccidentEditCtrl from './controllers/accidents/AccidentEditCtrl';
import ClosedListCtrl from './controllers/closed/ClosedListCtrl';
import StatisticsCtrl from './controllers/StatisticsCtrl';
import AuthCtrl from './controllers/AuthCtrl';

import Accident from './services/Accident';
import Closed from './services/Closed';
import Statistics from './services/Statistics';
import clickOut from './directives/clickOut';

require('../../node_modules/moment/locale/ru');
require('angular-mocks');
require('angular-resource');
require('angular-file-upload');
require('angular-tablesort');

angular
  .module('avarcom', [
    require('angular-ui-router'),
    require('angular-moment'),
    'angularFileUpload',
    'ngMockE2E',
    'ngResource',
    'tableSort'
  ])
  .constant('API', 'http://178.63.17.133:8181/api/v2')

  .config(router)

  .component('avarcomSidebar', sidebar)
  .component('justCalendar', justCalendar)
  .component('datePicker', datePicker)

  .controller('AccidentListCtrl', AccidentListCtrl)
  .controller('AccidentEditCtrl', AccidentEditCtrl)
  .controller('ClosedListCtrl', ClosedListCtrl)
  .controller('StatisticsCtrl', StatisticsCtrl)
  .controller('AuthCtrl', AuthCtrl)

  .factory('Accident', Accident)
  .factory('Closed', Closed)
  .factory('Statistics', Statistics)

  .directive('clickOut', clickOut);


require('./api');
