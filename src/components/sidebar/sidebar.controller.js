export default class {
  constructor(SidebarCalendar, AuthData, CONSTANT, $http, $state, $scope, $rootScope, Closed, $interval) {
    this.$rootScope = $rootScope;
    this.$http = $http;
    this.$state = $state;
    this.CONSTANT = CONSTANT;
    this.Closed = Closed;
    this.SidebarCalendar = SidebarCalendar;
    this.AuthData = AuthData;
    this.userData = AuthData.get();
    this.selectedCity = this.userData.city;
    this.toggleInit = false;
    this.minimize = this.userData.sidebarIsCollapsed;
    this.$rootScope.$emit('toggleSidebar', {isOpen: !this.minimize});

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
  toggleSidebar() {
    this.toggleInit = true;
    this.minimize = !this.minimize;
    this.userData.sidebarIsCollapsed = this.minimize;
    this.AuthData.set(this.userData);
    this.$rootScope.$emit('toggleSidebar', {isOpen: !this.minimize});
  }
  changeDate(day) {
    this.SidebarCalendar.set(day);
    this.$rootScope.$emit('changeMainCalendar', day);
    console.log(day);
  }
  changeCity(city) {
    if (this.selectedCity.short_name == city.short_name) return;

    this.$http.put(this.CONSTANT.API_URL + '/self', {city: city.short_name}).then(response => {
      this.userData.city = response.data.city;
      this.userData.cities = response.data.cities;

      this.AuthData.set(this.userData);
      this.$state.reload();
    });
  }
}
