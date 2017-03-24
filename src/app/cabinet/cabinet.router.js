export default function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/dashboard/cabinet', '/dashboard/cabinet/commissioners');

  $stateProvider
    .state('cabinet', {
      url: '/cabinet',
      parent: 'dashboard',
      templateUrl: 'views/app/cabinet/cabinet.html'
    })
    .state('cabinet.commissioners', {
      url: '/commissioners',
      templateUrl: 'views/app/cabinet/commissioners/commissioners.html',
      controller: 'CommissionersCtrl as $ctrl'
    });
}
