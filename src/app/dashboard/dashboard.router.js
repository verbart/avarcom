export default function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/dashboard', '/dashboard/accidents');

  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'views/app/dashboard/dashboard.html',
      controller: 'DashboardCtrl as dashboardCtrl',
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
