export default class {
  constructor($http, $uibModal, leafletData, toaster, CONSTANT) {
    this.$http = $http;
    this.toaster = toaster;
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

    leafletData.getMap('mainMap').then((map) => {
      this.lMap = map;

      map.on('locationfound', this.onLocationFound.bind(this));
      map.on('locationerror', this.onLocationError.bind(this));

      this.detectLocation();
    });
  }

  detectLocation() {
    this.lMap.locate({
      setView: true,
      maxZoom: 16,
      enableHighAccuracy: true,
      // watch: true
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
  }

  onLocationError(e) {
    console.log(e);

    this.locationIsDetected = true;

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
      }).finally(() => {
        this.geoLoacatebyGoogle();
      });
    } else {
      this.geoLoacatebyGoogle();
    }
  }

  geoLoacatebyGoogle() {
    this.$http.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${this.CONSTANT.GOOGLE_API_KEY}`)
      .then(response => {
        console.log(response);

        this.onLocationFound({
          accuracy: response.data.accuracy,
          latlng: response.data.location
        });
      }, error => {
        console.log(error);

        this.toaster.error('Не удалось определить местоположение, проверьте актуальность сетевых интерфейсов')
      });
  }
}
