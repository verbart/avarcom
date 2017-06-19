export default {
  templateUrl: 'views/components/main-header/main-header.html',
  controller: class {
    constructor($rootScope, $state, AuthData) {
      this.userData = AuthData.get();

      if (!this.userData) $state.go('logout');

      $rootScope.$on('$stateChangeSuccess', () => this.navbarIsActive = false);
    }
  }
}
