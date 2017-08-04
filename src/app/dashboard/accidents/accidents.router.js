export default function ($stateProvider) {
  $stateProvider
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
      });
}
