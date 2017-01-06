import angular from 'angular';
import router from './routes';
import sidebar from './components/sidebar';
import justCalendar from './components/justCalendar';
import AccidentListCtrl from './controllers/AccidentListCtrl';
import AccidentEditCtrl from './controllers/AccidentEditCtrl';
import Accident from './services/Accident';

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
  .controller('AccidentListCtrl', AccidentListCtrl)
  .controller('AccidentEditCtrl', AccidentEditCtrl)
  .factory('Accident', Accident);


require('./api');
