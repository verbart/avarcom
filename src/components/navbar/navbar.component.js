export default {
  templateUrl: 'views/components/navbar/navbar.html',
  controller: class {
    constructor(AuthData, CONSTANT, $http, $state, $scope, $rootScope, Closed, $interval) {
      this.$rootScope = $rootScope;
      this.$http = $http;
      this.$state = $state;
      this.CONSTANT = CONSTANT;
      this.Closed = Closed;
      this.AuthData = AuthData;
      this.userData = AuthData.get();
      this.selectedCity = this.userData.cities.find(e => e.is_selected);

      this.getClosedCounter();
      const interval = $interval(() => this.getClosedCounter(), 20*1000);
      $scope.$on('$destroy', () => $interval.cancel(interval));

      $rootScope.$on('updateClosedCounter', (event, args) => {
        this.closedCounter = args;
      });
    }

    getClosedCounter() {
      this.Closed.query(response => {
        if (response.data.length) {
          this.$rootScope.$emit('updateClosedCounter', response.data.filter(obj => !obj.is_confirmed).length);
        }
      }, error => {
        console.log(error);
      });
    }
  }
}
