export default class {
  constructor($state, Accident, AuthData, $http, $uibModal, Geocoding, $scope) {
    this.$state = $state;
    this.$http = $http;
    this.$uibModal = $uibModal;
    this.Geocoding = Geocoding;
    this.Accident = Accident;
    this.newAccident = {};
    this.userData = AuthData.get();
    this.selectedCity = this.userData.cities.find(e => e.is_selected);
    $scope.$on('leafletDirectiveMap.createAccidentMap.click', (event, args) => {
      const latlng = args.leafletEvent.latlng;

      args.model.markers['new'] = {
        lat: latlng.lat,
        lng: latlng.lng,
        draggable: true,
        icon: {
          iconUrl: 'images/icons/flag.png',
          iconSize: [32, 32],
          iconAnchor: [0, 32],
          popupAnchor: [0, -16]
        }
      };

      this.getAddress(latlng);
    });

    $scope.$on('leafletDirectiveMarker.createAccidentMap.dragend', (event, args) => {
      this.getAddress({
        lat: args.model.lat,
        lng: args.model.lng
      });
    });

    $scope.$on('leafletDirectiveMarker.createAccidentMap.click', (event, args) => {
      if (args.model.hasOwnProperty('commissioner_id')) {
        this.newAccident.commissar_id = args.model.commissioner_id;
      } else if (args.model.hasOwnProperty('accident_id')) {
        this.$state.go('dashboard.accidents.readOne', {id: args.model.accident_id}, {reload: true});
      }
    });
  }
  interacted(field) {
    return this.submitted || field.$dirty;
  }
  getAddress(latlng) {
    this.Geocoding.getAddress(latlng, response => {
      this.newAccident.address = response;
      this.newAccident.latitude = latlng.lat;
      this.newAccident.longitude = latlng.lng;
    });
  }
  getLocations(value) {
    return this.$http({
      method: 'POST',
      url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      headers: {
        'Authorization': 'Token 56795644c72463d902ba7d3787208e9779ec411d',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: {
        query: value,
        count: 5,
        locations: [{
          city: this.selectedCity.name
        }],
        restrict_value: true
      }
    }).then(function(response) {
      console.log(response.data);
      return response.data.suggestions.map(item => item.value);
    });
  }
  openMapModal(city, map) {
    const modalInstance = this.$uibModal.open({
      animation: false,
      component: 'accidentsMapModal',
      resolve: {
        city: () => city,
        address: () => this.newAccident.address,
        map: () => angular.copy(map),
        commissar_id: () => this.newAccident.commissar_id
      }
    });

    modalInstance.result.then(result => {
      map = result.map;
      result.commissar_id && (this.newAccident.commissar_id = result.commissar_id);

      if (result.address) {
        this.newAccident.address = result.address;
        this.newAccident.latitude = result.latitude;
        this.newAccident.longitude = result.longitude
      }
    }, () => {
      console.info('modal-component dismissed at: ' + new Date());
    });
  }
  sendAccident() {
    this.newAccident.crash_date = this.newAccident.date.format('DD.MM.YYYY');

    this.Accident.save(this.newAccident, response => {
      console.log('Created accident:', response);
      this.$state.go('dashboard.accidents.readOne', {id: response.crash_id}, {reload: true});
    }, error => {
      console.log(error);
    });
  }
}
