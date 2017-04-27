export default function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/dashboard/cabinet', '/dashboard/cabinet/users');

  $stateProvider
    .state('cabinet', {
      url: '/cabinet',
      parent: 'dashboard',
      templateUrl: 'views/app/cabinet/cabinet.html',
      authenticate: true
    })
    .state('cabinet.users', {
      url: '/users',
      templateUrl: 'views/app/cabinet/users/users.html',
      controller: 'UsersCtrl as usersCtrl',
      authenticate: true
    });
}
