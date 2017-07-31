export default class {
  constructor($state, $http, $stateParams, toaster, Moderation, CONSTANT) {
    this.$http = $http;
    this.$state = $state;
    this.CONSTANT = CONSTANT;
    this.Moderation = Moderation;
    this.toaster = toaster;
    this.selected = {};
    this.moderated = {};

    this.Moderation.get({id: $stateParams.id}, response => {
      this.selected = response.data;

      this.map = {
        center: {
          lat: +this.selected.lat,
          lng: +this.selected.lon,
          zoom: 16
        },
        markers: {
          accident: {
            lat: +this.selected.lat,
            lng: +this.selected.lon,
            message: this.selected.description || null,
            focus: Boolean(this.selected.description),
            icon: {
              iconUrl: 'images/icons/accident-marker_green.png',
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32]
            }
          }
        }
      };
    }, error => {
      console.log(error);
      $state.go('dashboard.moderation', {}, {reload: true})
    });
  }

  interacted(field) {
    return this.submitted || field.$dirty;
  }
  searchLocations(value) {
    return this.$http({
      method: 'GET',
      url: `${this.CONSTANT.API_URL_V2}/cities`,
      params: {
        name: value
      }
    }).then(response => {
      console.log(response.data);
      return response.data.length ? response.data.slice(0, 5) : this.searchNewLocations(value);
    }, error => {
      return this.searchNewLocations(value);
    });
  }
  searchNewLocations(value) {
    return this.$http({
      method: 'GET',
      url: `${this.CONSTANT.PROXY_URL}https://maps.googleapis.com/maps/api/place/autocomplete/json`,
      params: {
        key: this.CONSTANT.GOOGLE_API_KEY,
        input: value,
        types: '(cities)',
        language: 'ru'
      }
    }).then(response => {
      console.log(response);
      return response.data.predictions
    }, error => {
      console.log(error);
    });
  }
  onSelectAddressTypeahead(item) {
    console.log(item);

    if (item.place_id) {
      this.$http({
        method: 'GET',
        url: `${this.CONSTANT.PROXY_URL}https://maps.googleapis.com/maps/api/place/details/json`,
        params: {
          key: this.CONSTANT.GOOGLE_API_KEY,
          placeid: item.place_id,
          language: 'ru'
        }
      }).then(response => {
        console.log(response.data);

        const city = response.data.result;

        this.addCity({
          name: city.name,
          type: city.place_id,
          latitude: city.geometry.location.lat,
          longitude: city.geometry.location.lng,
        });

        this.moderated.city = item.place_id;
      }, error => {
        console.log(error);
      });
    } else if (item.short_name){
      this.moderated.city = item.short_name;
    }
  }

  addCity(city) {
    this.$http({
      method: 'POST',
      url: `${this.CONSTANT.API_URL_V2}/cities`,
      data: {
        name: city.name,
        type: city.type,
        latitude: city.latitude,
        longitude: city.longitude
      }
    }).then(response => {
      console.log('add city', response.data);
    }, error => {
      console.log(error);
    });
  }
  sendAccident(status) {
    this.moderated.status = status;

    this.Moderation.moderate({id: this.selected.id}, this.moderated, response => {
      console.log('Moderation.moderate', response);

      this.$state.go('dashboard.moderation', {}, {reload: true});
    }, error => {
      console.log(error);
    });
  }
}
