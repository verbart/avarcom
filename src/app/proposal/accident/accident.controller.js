export default class {
  constructor($http, $uibModal, leafletData, CONSTANT) {
    this.$http = $http;
    this.CONSTANT = CONSTANT;
    this.locationIsDetected = false;
    this.$uibModal = $uibModal;
    this.leafletData = leafletData;
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

    this.detectLocation();
  }

  detectLocation() {
    this.leafletData.getMap('mainMap').then((map) => {
      this.lMap = map;

      this.lMap.locate({
        setView: true,
        maxZoom: 16,
        enableHighAccuracy: true,
        // watch: true
      });

      this.lMap.on('locationfound', this.onLocationFound.bind(this));
      this.lMap.on('locationerror', this.onLocationError.bind(this));
    });
  }

  onLocationFound(e) {
    this.locationIsDetected = true;
    const radius = Math.round(e.accuracy / 2);

    this.map.center.lat = e.latlng.lat;
    this.map.center.lng = e.latlng.lng;

    this.map.markers['user'] = {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      message: `Ваше местоположение предположительно в радиусе ${radius}м`,
      focus: true
    };

    this.lMap.removeLayer(this.radiusCircle);
    this.radiusCircle = L.circle(e.latlng, radius).addTo(this.lMap);
  };

  onLocationError(e) {
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
      }).result.then(result => {}, () => {
        console.info('modal-component dismissed at: ' + new Date());
      }).then(() => {
        this.warningMessageOfGPSisShowed = true;
      });
    }

    this.$http.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${this.CONSTANT.GOOGLE_API_KEY}`).then(
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
  }
}
