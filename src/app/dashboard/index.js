import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';

import router from './dashboard.router';

import sidebar from '../../components/sidebar/sidebar.component';
import justCalendar from '../../components/just-calendar/just-calendar.component';
import datePicker from '../../components/date-picker/date-picker.component';

import AccidentListCtrl from './accidents/list/accident-list.controller';
import AccidentEditCtrl from './accidents/edit/accident-edit.controller';
import ClosedListCtrl from './closed/closed-list.controller';
import StatisticsCtrl from './statistics/statistics.controller';

import Accident from './accidents/accident.factory';
import Closed from './closed/closed.factory';
import Statistics from './statistics/statistics.factory';

import 'angular-resource';
import 'angular-file-upload';
import 'angular-tablesort';
import 'ngstorage';
import 'angular-moment';

angular.module('avarcom.dashboard', [
        uiRouter,
        ngResource,
        'angularMoment',
        'angularFileUpload',
        'tableSort',
        'ngStorage'
    ])

    .config(router)

    .component('avarcomSidebar', sidebar)
    .component('justCalendar', justCalendar)
    .component('datePicker', datePicker)

    .controller('AccidentListCtrl', AccidentListCtrl)
    .controller('AccidentEditCtrl', AccidentEditCtrl)
    .controller('ClosedListCtrl', ClosedListCtrl)
    .controller('StatisticsCtrl', StatisticsCtrl)

    .factory('Accident', Accident)
    .factory('Closed', Closed)
    .factory('Statistics', Statistics);
