import angular from 'angular';
import 'intro.js';

import './angular-intro';

import IntroService from './intro.service';


angular.module('avarcom.intro', [
  'angular-intro'
])
  .service('IntroService', IntroService);
