export default class {
  constructor($http, CONSTANT, Accident, AuthData, $interval, $scope, $rootScope) {
    this.$http = $http;
    this.CONSTANT = CONSTANT;
    this.Accident = Accident;
    this.userData = AuthData.get();
    this.selectedCity = this.userData.cities.find(e => e.is_selected);
    // this.selectedDate = SidebarCalendar.get();
    this.getAccidents(this.selectedDate);
    $rootScope.$on('changeMainCalendar', (event, args) => {
      this.selectedDate = args.date;
      this.getAccidents(args.date.format('DD.MM.YYYY'));
    });
    const interval = $interval(() => this.getAccidents(this.selectedDate && this.selectedDate.format('DD.MM.YYYY')), 20 * 1000);
    $scope.$on('$destroy', () => {
      console.log(interval);
      $interval.cancel(interval)
    });
  }

  getAccidents(date) {
    this.Accident.query({date, web: true}, response => {
      this.accidents = response.data;

      this.map = this.map || {
          attribution: '',
        center: {
          lat: this.selectedCity.latitude,
          lng: this.selectedCity.longitude,
          zoom: this.selectedCity.zoom
        },
        markers: {}
      };


      this.accidents.forEach((obj, index) => {
        if (obj.status.code == 1) this.map.markers['accident_'+index] = {
          accident_id: obj.crash_id,
          lat: +obj.latitude,
          lng: +obj.longitude,
          message: obj.description || null,
          icon: {
            iconUrl: 'images/icons/accident-marker_green.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
          }
        };
      });

      this.$http.get(this.CONSTANT.API_URL+'/users').then(response => {
        this.commissioners = response.data;
        console.log('commissioners', this.commissioners);

        this.commissioners.forEach((obj, index) => {
          this.map.markers['commissioner_' + index] = {
            commissioner_id: obj.id,
            lat: +obj.latitude,
            lng: +obj.longitude,
            message: obj.description || null,
            icon: {
              iconUrl: (function () {
                if (obj.busy) return 'images/icons/car_red.png';
                else if (!obj.available) return 'images/icons/car_orange.png';
                return 'images/icons/car_green.png';
              }()),
              iconSize: [36, 20],
              popupAnchor: [0, -10]
            }
          };
        });
      });
    });
  }
}
