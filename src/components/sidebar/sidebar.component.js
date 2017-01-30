export default {
    templateUrl: 'views/components/sidebar/sidebar.html',
    controller: class {
        constructor(AuthToken, CONSTANT, $http, $state) {
            this.$http = $http;
            this.$state = $state;
            this.CONSTANT = CONSTANT;
            this.AuthToken = AuthToken;
            this.minimize = false;
            this.toggleInit = false;
            this.userData = AuthToken.get();
            this.cities = this.userData.cities;
            this.selectedCity = this.cities.find(e => e.isSelected);
        }

        changeDate(day) {
            console.log(day);
        }
        changeCity(city) {
            this.$http.post(this.CONSTANT.API_URL + '/users/update_city', {}, {headers: {city: city.short_name}}).then(() => {
                this.userData.cities.forEach(e => {
                    e.isSelected = false;
                    if (e.short_name == city.short_name) e.isSelected = true;
                });

                this.AuthToken.set(this.userData);
                this.$state.reload();
            });
        }
    }
}
