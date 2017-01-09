import angular from 'angular';
import router from './routes';
import sidebar from './components/sidebar';
import justCalendar from './components/justCalendar';
import datePicker from './components/datePicker';
import AccidentListCtrl from './controllers/AccidentListCtrl';
import AccidentEditCtrl from './controllers/AccidentEditCtrl';
import Accident from './services/Accident';
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
  .controller('StatisticsCtrl', StatisticsCtrl)
  .factory('Accident', Accident)
  .directive('clickOut', clickOut);


require('./api');
