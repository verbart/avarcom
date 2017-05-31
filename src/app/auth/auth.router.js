export default function ($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/app/auth/login/login.html',
      controller: 'LoginCtrl as loginCtrl'
    })
    .state('logout', {
      url: '/logout',
      controller: function (AuthService, $state) {
        AuthService.logout();
        $state.go('login');
      }
    })
    .state('password-recovery', {
      url: '/password-recovery',
      templateUrl: 'views/app/auth/password-recovery/password-recovery.html'
    });
}
