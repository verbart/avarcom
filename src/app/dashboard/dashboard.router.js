export default function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/dashboard', '/dashboard/accidents');

  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'views/app/dashboard/dashboard.html',
      authenticate: true
    })
    .state('dashboard.accidents', {
      url: '/accidents',
      templateUrl: 'views/app/dashboard/accidents/list/list.html',
      controller: 'AccidentListCtrl as listCtrl',
      authenticate: true
    })
      .state('dashboard.accidents.edit', {
        url: '/:id',
        templateUrl: 'views/app/dashboard/accidents/edit/edit.html',
        controller: 'AccidentEditCtrl as editCtrl'
      })
    .state('dashboard.closed', {
      url: '/closed/:id',
      params:  {
        id: {
          value: null,
          squash: true
        }
      },
      templateUrl: 'views/app/dashboard/closed/list.html',
      controller: 'ClosedListCtrl as listCtrl'
    })
    .state('dashboard.statistics', {
      url: '/statistics',
      templateUrl: 'views/app/dashboard/statistics/statistics.html',
      controller: 'StatisticsCtrl as statCtrl'
    });
}
