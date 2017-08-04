import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';

import router from './closed.router';

import justCalendar from '../../../components/just-calendar/just-calendar.component'
import datePicker from '../../../components/date-picker/date-picker.component';
import periodModal from '../../../components/modals/period/period.component';
import confirmModal from '../../../components/modals/confirm/confirm.component';

import ClosedListCtrl from './closed.controller';
import ClosedEditCtrl from './edit/edit.controller';

import Closed from './closed.factory';

import 'angular-resource';
import 'ngstorage';
import 'angular-moment';
import 'ui-leaflet';
import 'angular-simple-logger';
import 'angular-messages';
import 'ng-file-upload';
import 'angular-ui-bootstrap';
import 'angular-bootstrap-lightbox';
import 'angular-ui-mask';


angular.module('avarcom.dashboard.closed', [
  uiRouter,
  ngResource,
  'ngMessages',
  'angularMoment',
  'ui.bootstrap',
  'ngStorage',
  'ui-leaflet',
  'nemLogging',
  'ngFileUpload',
  'bootstrapLightbox'
])
  .config(router)
  .config(function (LightboxProvider) {
    LightboxProvider.templateUrl = 'views/components/modals/image/image.html';
    LightboxProvider.getImageUrl = function (image) {
      return '//i.imgsafe.org/' + image;
    };
  })

  // .component('justCalendar', justCalendar)
  // .component('datePicker', datePicker)
  .component('periodModal', periodModal)
  .component('confirmModal', confirmModal)

  .controller('ClosedListCtrl', ClosedListCtrl)
  .controller('ClosedEditCtrl', ClosedEditCtrl)

  .factory('Closed', Closed);
