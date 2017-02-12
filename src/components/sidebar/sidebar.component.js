export default {
    templateUrl: 'views/components/sidebar/sidebar.html',
    controller: class {
        constructor(SidebarCalendar, AuthData, CONSTANT, $http, $state, $rootScope) {
            this.$rootScope = $rootScope;
            this.$http = $http;
            this.$state = $state;
            this.CONSTANT = CONSTANT;
            this.SidebarCalendar = SidebarCalendar;
            this.AuthData = AuthData;
            this.AuthData = AuthData.get();
            this.selectedCity = this.AuthData.cities.find(e => e.is_selected);
            this.toggleInit = false;
            this.minimize = this.AuthData.sidebarIsCollapsed;
        }

        toggleSidebar() {
            this.toggleInit = true;
            this.minimize = !this.minimize;
            this.AuthData.sidebarIsCollapsed = this.minimize;
            this.AuthData.set(this.AuthData);
        }
        changeDate(day) {
            this.SidebarCalendar.set(day);
            this.$rootScope.$emit('changeMainCalendar', day);
            console.log(day);
        }
        changeCity(city) {
            this.$http.post(this.CONSTANT.API_URL + '/users/update_city', {}, {headers: {city: city.short_name}}).then(() => {
                this.AuthData.cities.forEach(e => {
                    e.is_selected = false;
                    if (e.short_name == city.short_name) e.is_selected = true;
                });
                console.log(this.AuthData.cities);

                this.AuthData.set(this.AuthData);
                this.$state.reload();
            });
        }
    }
}
