import angular from 'angular';

import router from './proposal.router';
import AccidentCtrl from './accident/accident.controller';


angular.module('avarcom.proposal', [

])
  .config(router)

  .controller('AccidentCtrl', AccidentCtrl);
  // .service('IntroService', IntroService);
