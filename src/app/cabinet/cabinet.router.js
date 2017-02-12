export default function ($stateProvider) {
  $stateProvider
    .state('cabinet', {
      url: '/cabinet',
      parent: 'dashboard',
      templateUrl: 'views/app/cabinet/cabinet.html'
    });
}
