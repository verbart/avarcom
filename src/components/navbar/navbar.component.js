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
    changeCity(city) {
      if (this.selectedCity.short_name == city.short_name) return;

      this.$http.post(this.CONSTANT.API_URL + '/users/update_city', {}, {headers: {city: city.short_name}}).then(() => {
        this.userData.cities.forEach(e => {
          e.is_selected = false;
          if (e.short_name == city.short_name) e.is_selected = true;
        });

        this.CONSTANT.OneSignal.push(['sendTags', {
          city: city.short_name
        }]);

        this.AuthData.set(this.userData);
        this.$state.reload();
      });
    }
  }
}
