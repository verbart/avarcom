export default {
  templateUrl: 'views/components/sidebar/sidebar.html',
  controller: class {
    constructor(SidebarCalendar, AuthData, CONSTANT, $http, $state, $rootScope, Closed, $interval) {
      this.$rootScope = $rootScope;
      this.$http = $http;
      this.$state = $state;
      this.CONSTANT = CONSTANT;
      this.SidebarCalendar = SidebarCalendar;
      this.AuthData = AuthData;
      this.userData = AuthData.get();
      this.selectedCity = this.userData.cities.find(e => e.is_selected);
      this.toggleInit = false;
      this.minimize = this.userData.sidebarIsCollapsed;

      $interval(() => Closed.query(response => {
        if (response.data.length) {
          this.$rootScope.$emit('updateClosedCounter', response.data.filter(obj => !obj.is_confirmed).length);
        }
      }, error => {
        console.log(error);
      }), 20*1000);

      $rootScope.$on('updateClosedCounter', (event, args) => {
        this.closedCounter = args;
      });
    }

    toggleSidebar() {
      this.toggleInit = true;
      this.minimize = !this.minimize;
      this.userData.sidebarIsCollapsed = this.minimize;
      this.AuthData.set(this.userData);
    }
    changeDate(day) {
      this.SidebarCalendar.set(day);
      this.$rootScope.$emit('changeMainCalendar', day);
      console.log(day);
    }
    changeCity(city) {
      if (this.selectedCity.short_name == city.short_name) return;

      this.$http.post(this.CONSTANT.API_URL + '/users/update_city', {}, {headers: {city: city.short_name}}).then(() => {
        this.userData.cities.forEach(e => {
          e.is_selected = false;
          if (e.short_name == city.short_name) e.is_selected = true;
        });

        this.AuthData.set(this.userData);
        this.$state.reload();
      });
    }
  }
}
