import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';

import router from './moderation.router';

import ModerationCtrl from './moderation.controller';
import ReadOneCtrl from './read-one/read-one.controller';

import Moderation from './moderation.factory';

import 'angular-resource';
import 'ui-leaflet';
import 'angular-simple-logger';
import 'angular-messages';
import 'angular-ui-bootstrap';

angular.module('avarcom.dashboard.moderation', [
  uiRouter,
  ngResource,
  'ngMessages',
  'ui.bootstrap',
  'ui-leaflet',
  'nemLogging'
])
  .config(router)

  .controller('ModerationCtrl', ModerationCtrl)
  .controller('ReadOneCtrl', ReadOneCtrl)

  .factory('Moderation', Moderation);
