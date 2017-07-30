export default function ($stateProvider) {
  $stateProvider
    .state('dashboard.moderation', {
      url: '/moderation',
      templateUrl: 'views/app/dashboard/moderation/moderation.html',
      controller: 'ModerationCtrl as moderationCtrl',
      authenticate: true
    })
    .state('dashboard.moderation.readOne', {
      url: '/:id',
      templateUrl: 'views/app/dashboard/moderation/read-one/read-one.html',
      controller: 'ReadOneCtrl as readOneCtrl',
      authenticate: true
    });
}
