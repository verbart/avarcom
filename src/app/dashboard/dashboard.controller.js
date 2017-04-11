export default class {
    constructor($rootScope) {
      this.sidebarIsOpen = false;

      $rootScope.$on('toggleSidebar', (event, args) => {
        this.sidebarIsOpen = args.isOpen;
      });
    }
}
