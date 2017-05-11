export default {
  templateUrl: 'views/components/main-header/main-header.html',
  controller: class {
    constructor($http, $state, CONSTANT, AuthData) {
      this.$http = $http;
      this.$state = $state;
      this.CONSTANT = CONSTANT;
      this.AuthData = AuthData;
      this.userData = AuthData.get();
      this.selectedCities = this.userData.cities.filter(city => city.is_active);

      this.citiesOptions = {
        selectionLimit: 1,
        styleActive: true,
        displayProp: 'name',
        showCheckAll: false,
        showUncheckAll: false
      };

      this.onCitySelected = city => {
        this.$http.put(this.CONSTANT.API_URL_V2 + '/self', {city: city.short_name}).then(response => {
          this.userData.city = response.data.city;
          this.userData.cities = response.data.cities;
          this.selectedCities = this.userData.cities.filter(city => city.is_active);

          this.AuthData.set(this.userData);

          this.CONSTANT.OneSignal.push(['sendTags', {
            city: city.short_name
          }]);

          this.$state.reload();
        }, error => {
          console.log(error);
        });
      };

      this.onCityDeselected = city => {
        this.selectedCities = [city];
      };
    }
  }
}
