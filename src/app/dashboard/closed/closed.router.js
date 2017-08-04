export default function ($stateProvider) {
  $stateProvider
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
      });
}
