export default function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/proposal', '/proposal/accident');

  $stateProvider
    .state('proposal', {
      url: '/proposal',
      templateUrl: 'views/app/proposal/proposal.html'
    })
    .state('proposal.accident', {
      url: '/accident',
      templateUrl: 'views/app/proposal/accident/accident.html',
      controller: 'AccidentCtrl',
      controllerAs: 'accidentCtrl'
    });
}
