import angular from 'angular';

import router from './proposal.router';
import ProposalCtrl from './proposal.controller';
import proposalContactModal from '../../components/modals/proposal-contact/proposal-contact.component';

import 'angular-ui-bootstrap';


angular.module('avarcom.proposal', [
  'ui.bootstrap'
])
  .config(router)

  .controller('ProposalCtrl', ProposalCtrl)
  .component('proposalContactModal', proposalContactModal);
