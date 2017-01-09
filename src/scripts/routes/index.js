export default function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');

  $urlRouterProvider.otherwise('/404');

  $stateProvider
    .state('accidents', {
      abstract: true,
      url: '/',
      templateUrl: 'templates/pages/accidents/accidents.html'
    })
      .state('accidents.create', {
        url: '',
        templateUrl: 'templates/pages/accidents/create.html'
      })
      .state('accidents.edit', {
        url: 'edit/:id',
        parent: 'accidents',
        templateUrl: 'templates/pages/accidents/edit.html',
        controller: 'AccidentEditCtrl as editCtrl'
      })
    .state('completed', {
      url: '/completed',
      templateUrl: 'templates/pages/completed.html'
    })
    .state('statistics', {
      url: '/statistics',
      templateUrl: 'templates/pages/statistics.html',
      controller: 'StatisticsCtrl as statCtrl'
    })
    .state('404', {
      url: '/404',
      templateUrl: 'templates/pages/errors/404.html'
    });
}
