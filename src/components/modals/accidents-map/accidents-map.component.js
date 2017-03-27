export default {
  templateUrl: 'views/components/modals/accidents-map/accidents-map.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function ($scope, $state, Geocoding) {
    this.$onInit = () => {
      this.city = this.resolve.city;
      this.map = this.resolve.map;
      this.result = {
        map: this.map,
        commissar_id: this.resolve.commissar_id,
        address: this.resolve.address
      };
    };

    const getAddress = latlng => {
      Geocoding.getAddress(latlng, response => {
        this.result.address = response;
        this.result.latitude = latlng.lat;
        this.result.longitude = latlng.lng;
      });
    };

    $scope.$on('leafletDirectiveMap.createAccidentMapModal.click', (event, args) => {
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

      getAddress(latlng);
    });

    $scope.$on('leafletDirectiveMarker.createAccidentMapModal.dragend', (event, args) => {
      getAddress({
        lat: args.model.lat,
        lng: args.model.lng
      });
    });

    $scope.$on('leafletDirectiveMarker.createAccidentMapModal.click', (event, args) => {
      if (args.model.hasOwnProperty('commissioner_id')) {
        this.result.commissar_id = args.model.commissioner_id;
      } else if (args.model.hasOwnProperty('accident_id')) {
        this.cancel();
        $state.go('dashboard.accidents.readOne', {id: args.model.accident_id}, {reload: true});
      }
    });

    this.ok = () => {
      this.close({$value: this.result});
    };

    this.cancel = () => {
      this.dismiss({$value: 'cancel'});
    };
  }
};
