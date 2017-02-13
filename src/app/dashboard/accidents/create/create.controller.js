export default class {
  constructor($state, Accident, $uibModal, Geocoding, $scope) {
    this.$state = $state;
    this.$uibModal = $uibModal;
    this.Geocoding = Geocoding;
    this.Accident = Accident;
    this.newAccident = {};
    this.errors = {
        locationExist: false,
    };

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
      this.newAccident.commissar_id = args.model.commissioner_id;
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
    });
  }
}
