import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';

import router from './dashboard.router';

import sidebar from '../../components/sidebar/sidebar.component';
import justCalendar from '../../components/just-calendar/just-calendar.component';
import datePicker from '../../components/date-picker/date-picker.component';

import AccidentListCtrl from './accidents/accidents.controller';
import AccidentReadOneCtrl from './accidents/read-one/read-one.controller';
import AccidentCreateCtrl from './accidents/create/create.controller';
import ClosedListCtrl from './closed/closed.controller';
import StatisticsCtrl from './statistics/statistics.controller';

import Accident from './accidents/accident.factory';
import Closed from './closed/closed.factory';
import Statistics from './statistics/statistics.factory';

import 'angular-resource';
import 'angular-file-upload';
import 'angular-tablesort';
import 'ngstorage';
import 'angular-moment';
import 'ui-leaflet';
import 'angular-simple-logger';
import 'angular-utf8-base64';
import 'angular-dropdowns';


angular.module('avarcom.dashboard', [
        uiRouter,
        ngResource,
        'ngDropdowns',
        'angularMoment',
        'angularFileUpload',
        'tableSort',
        'ngStorage',
        'ui-leaflet',
        'nemLogging',
        'utf8-base64'
    ])
    .run(function ($templateCache) {
        $templateCache.put('ngDropdowns/templates/dropdownSelectItem.html', [
            '<li ng-class="{active: dropdownSelectItem.isSelected, divider: (dropdownSelectItem.divider && !dropdownSelectItem[dropdownItemLabel]), \'divider-label\': (dropdownSelectItem.divider && dropdownSelectItem[dropdownItemLabel])}">',
            '<a href="" class="dropdown-item"',
            ' ng-if="!dropdownSelectItem.divider"',
            ' ng-href="{{dropdownSelectItem.href}}"',
            ' ng-click="selectItem()">',
            '{{dropdownSelectItem[dropdownItemLabel]}}',
            '</a>',
            '<span ng-if="dropdownSelectItem.divider">',
            '{{dropdownSelectItem[dropdownItemLabel]}}',
            '</span>',
            '</li>'
        ].join(''));
    })

    .config(router)

    .component('avarcomSidebar', sidebar)
    .component('justCalendar', justCalendar)
    .component('datePicker', datePicker)

    .controller('AccidentListCtrl', AccidentListCtrl)
    .controller('AccidentReadOneCtrl', AccidentReadOneCtrl)
    .controller('AccidentCreateCtrl', AccidentCreateCtrl)
    .controller('ClosedListCtrl', ClosedListCtrl)
    .controller('StatisticsCtrl', StatisticsCtrl)

    .factory('Accident', Accident)
    .factory('Closed', Closed)
    .factory('Statistics', Statistics);
