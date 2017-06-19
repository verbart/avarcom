export default {
  templateUrl: 'views/components/main-header/main-header.html',
  controller: class {
    constructor($rootScope) {
      $rootScope.$on('$stateChangeSuccess', () => this.navbarIsActive = false);
    }
  }
}
