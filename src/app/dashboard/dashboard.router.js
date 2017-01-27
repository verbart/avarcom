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
      templateUrl: 'views/app/dashboard/accidents/accidents.html',
      controller: 'AccidentListCtrl as listCtrl',
      authenticate: true
    })
      .state('dashboard.accidents.readOne', {
        url: '/:id',
        templateUrl: 'views/app/dashboard/accidents/read-one/read-one.html',
        controller: 'AccidentReadOneCtrl as readOneCtrl',
        authenticate: true
      })
    .state('dashboard.closed', {
      url: '/closed/:id',
      params:  {
        id: {
          value: null,
          squash: true
        }
      },
      templateUrl: 'views/app/dashboard/closed/read.html',
      controller: 'ClosedListCtrl as listCtrl',
      authenticate: true
    })
    .state('dashboard.statistics', {
      url: '/statistics',
      templateUrl: 'views/app/dashboard/statistics/statistics.html',
      controller: 'StatisticsCtrl as statCtrl',
      authenticate: true
    });
}
