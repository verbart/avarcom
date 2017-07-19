export default function ($stateProvider) {
  $stateProvider
    .state('proposal', {
      url: '/proposal?token',
      templateUrl: 'views/app/proposal/proposal.html',
      controller: 'ProposalCtrl',
      controllerAs: 'proposalCtrl'
    });
}
