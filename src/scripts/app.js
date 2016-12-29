import angular from 'angular';
import router from './routes';
import sidebar from './components/sidebar';


angular
  .module('avarcom', [
    require('angular-ui-router')
  ])
  .config(router)
  .component('avarcomSidebar', sidebar);
