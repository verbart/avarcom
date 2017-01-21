export default function ($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlMatcherFactoryProvider.strictMode(false);

  $urlRouterProvider.when('/', '/accidents');
  $urlRouterProvider.otherwise('/404');

  $stateProvider
    .state('main', {
      url: '',
      abstract: true,
      views: {
        sidebar: {
          template: '<avarcom-sidebar>',
        }
      }
    })
    .state('accidents', {
      url: '/accidents',
      parent: 'main',
      views: {
        'content@': {
          templateUrl: 'templates/pages/accidents/list.html',
          controller: 'AccidentListCtrl as listCtrl'
        }
      }
    })
      .state('accidents.edit', {
        url: '/:id',
        templateUrl: 'templates/pages/accidents/edit.html',
        controller: 'AccidentEditCtrl as editCtrl'
      })
    .state('closed', {
      url: '/closed/:id',
      parent: 'main',
      params:  {
        id: {
          value: null,
          squash: true
        }
      },
      views: {
        'content@': {
          templateUrl: 'templates/pages/closed/list.html',
          controller: 'ClosedListCtrl as listCtrl'
        }
      }
    })
    .state('statistics', {
      url: '/statistics',
      parent: 'main',
      views: {
        'content@': {
          templateUrl: 'templates/pages/statistics.html',
          controller: 'StatisticsCtrl as statCtrl'
        }
      }
    })
    .state('login', {
      url: '/login',
      views: {
        content: {
          templateUrl: 'templates/pages/login.html',
          controller: 'AuthCtrl as AuthCtrl'
        }
      }
    })
    .state('password-recovery', {
      url: '/password-recovery',
      views: {
        content: {
          templateUrl: 'templates/pages/password-recovery.html',
          controller: 'AuthCtrl as AuthCtrl'
        }
      }
    })
    .state('404', {
      url: '/404',
      views: {
        content: {
          templateUrl: 'templates/pages/errors/404.html'
        }
      }
    });
}
