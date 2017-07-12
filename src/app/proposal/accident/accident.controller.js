export default class {
  constructor($state, $http, $uibModal, leafletData, CONSTANT) {
    this.$uibModal = $uibModal;
    this.map = {
      center: {
        lat: 0,
        lng: 0,
        zoom: 16
      },
      markers: {}
    };
    this.radiusCircle = {};
    this.warningMessageOfGPSisShowed = false;

    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });

    leafletData.getMap('mainMap').then((map) => {
      map.locate({
        setView: true,
        maxZoom: 16,
        // watch: true,
        // enableHighAccuracy: true
      });

      this.onLocationFound = (e) => {
        const radius = Math.round(e.accuracy / 2);

        this.map.center.lat = e.latlng.lat;
        this.map.center.lng = e.latlng.lng;

        this.map.markers['user'] = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          message: `Ваше местоположение предположительно в радиусе ${radius}м`,
          focus: true
        };

        map.removeLayer(this.radiusCircle);
        this.radiusCircle = L.circle(e.latlng, radius).addTo(map);
      };

      this.onLocationError = (e) => {
        console.log(e);

        if (!this.warningMessageOfGPSisShowed) {
          this.$uibModal.open({
            component: 'alertModal',
            size: 'xs',
            resolve: {
              message: () => `
              Не удалось подключится к спутникам,
              попробуем определить Ваше местоположение с помощью интернет соединения
            `
            }
          }).result.then(result => {
          }, () => {
            console.info('modal-component dismissed at: ' + new Date());
          }).then(() => {
            this.warningMessageOfGPSisShowed = true;
          });
        }

        $http.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${CONSTANT.GOOGLE_API_KEY}`).then(
          response => {
            console.log(response);
            this.onLocationFound({
              accuracy: response.data.accuracy,
              latlng: response.data.location
            });
          }, error => {
            console.log(error);
          }
        )
      };

      map.on('locationfound', this.onLocationFound);
      map.on('locationerror', this.onLocationError);
    });

  // interacted(field) {
  //   return this.submitted || field.$dirty;
  // }
  // sendAccident() {
  //   this.Accident.update({id: this.selected.crash_id}, this.selected, () => {
  //     this.$state.go('dashboard.accidents.readOne', {id: this.selected.crash_id}, {reload: true});
  //   }, error => {
  //     console.log(error);
  //   });
  }
}
