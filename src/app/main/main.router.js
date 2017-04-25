export default function ($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/app/main/main.html',
      controller: 'MainCtrl as mainCtrl'
    });
}
