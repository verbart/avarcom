export default function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/dashboard', '/dashboard/accidents');

  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'views/app/dashboard/dashboard.html',
      controller: 'DashboardCtrl as dashboardCtrl',
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
      url: '/closed',
      templateUrl: 'views/app/dashboard/closed/closed.html',
      controller: 'ClosedListCtrl as listCtrl',
      authenticate: true
    })
      .state('dashboard.closed.edit', {
        url: '/:id',
        templateUrl: 'views/app/dashboard/closed/edit/edit.html',
        controller: 'ClosedEditCtrl as editCtrl',
        authenticate: true
      })
    .state('dashboard.statistics', {
      url: '/statistics',
      templateUrl: 'views/app/dashboard/statistics/statistics.html',
      controller: 'StatisticsCtrl as statCtrl',
      authenticate: true
    })
    .state('dashboard.help', {
      url: '/help',
      templateUrl: 'views/app/dashboard/help/help.html',
      authenticate: true
    });
}
