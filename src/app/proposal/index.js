import angular from 'angular';
import 'element-closest';

import router from './proposal.router';
import AccidentCtrl from './accident/accident.controller';
import proposalContactModal from '../../components/modals/proposal-contact/proposal-contact.component';

import 'angular-ui-bootstrap';


angular.module('avarcom.proposal', [
  'ui.bootstrap'
])
  .config(router)

  .controller('AccidentCtrl', AccidentCtrl)
  .component('proposalContactModal', proposalContactModal);
