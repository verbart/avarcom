import angular from 'angular';
import router from './routes';
import sidebar from './components/sidebar';
import justCalendar from './components/justCalendar';
import datePicker from './components/datePicker';
import AccidentListCtrl from './controllers/accidents/AccidentListCtrl';
import AccidentEditCtrl from './controllers/accidents/AccidentEditCtrl';
import ClosedListCtrl from './controllers/closed/ClosedListCtrl';
import ClosedEditCtrl from './controllers/closed/ClosedEditCtrl';
import Accident from './services/Accident';
import Closed from './services/Closed';
import clickOut from './directives/clickOut';
import StatisticsCtrl from './controllers/StatisticsCtrl';

require('../../node_modules/moment/locale/ru');
require('angular-mocks');
require('angular-resource');


angular
  .module('avarcom', [
    require('angular-ui-router'),
    require('angular-moment'),
    'ngMockE2E',
    'ngResource'
  ])
  .config(router)
  .component('avarcomSidebar', sidebar)
  .component('justCalendar', justCalendar)
  .component('datePicker', datePicker)
  .controller('AccidentListCtrl', AccidentListCtrl)
  .controller('AccidentEditCtrl', AccidentEditCtrl)
  .controller('ClosedListCtrl', ClosedListCtrl)
  .controller('ClosedEditCtrl', ClosedEditCtrl)
  .controller('StatisticsCtrl', StatisticsCtrl)
  .factory('Accident', Accident)
  .factory('Closed', Closed)
  .directive('clickOut', clickOut);


require('./api');
