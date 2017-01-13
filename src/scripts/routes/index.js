export default function ($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlMatcherFactoryProvider.strictMode(false);

  $urlRouterProvider.when('/', '/accidents');
  $urlRouterProvider.otherwise('/404');

  $stateProvider
    .state('accidents', {
      url: '/accidents',
      abstract: true,
      templateUrl: 'templates/pages/accidents/list.html',
      controller: 'AccidentListCtrl as listCtrl'
    })
      .state('accidents.create', {
        url: '',
        templateUrl: 'templates/pages/accidents/create.html'
      })
      .state('accidents.edit', {
        url: '/:id',
        templateUrl: 'templates/pages/accidents/edit.html',
        controller: 'AccidentEditCtrl as editCtrl'
      })
    .state('closed', {
      url: '/closed/:id',
      params:  {
        id: {
          value: null,
          squash: true
        }
      },
      templateUrl: 'templates/pages/closed/list.html',
      controller: 'ClosedListCtrl as listCtrl'
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
