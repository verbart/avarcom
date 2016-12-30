import angular from 'angular';
import router from './routes';
import sidebar from './components/sidebar';
import justCalendar from './components/justCalendar';

require('../../node_modules/moment/locale/ru');


angular
  .module('avarcom', [
    require('angular-ui-router'),
    require('angular-moment')
  ])
  .config(router)
  .component('avarcomSidebar', sidebar)
  .component('justCalendar', justCalendar);
