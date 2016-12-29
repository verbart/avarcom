function router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');

  $urlRouterProvider.otherwise('/404');

  $stateProvider
    .state('accident', {
      url: '/',
      templateUrl: 'pages/accident.html'
    })
    .state('completed', {
      url: '/completed',
      templateUrl: 'pages/completed.html'
    })
    .state('statistics', {
      url: '/statistics',
      templateUrl: 'pages/statistics.html'
    })
    .state('404', {
      url: '/404',
      templateUrl: 'pages/errors/404.html'
    })
}

export default router;
