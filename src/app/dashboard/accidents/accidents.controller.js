export default class {
    constructor($http, CONSTANT, Accident, SidebarCalendar, AuthToken, $interval, $rootScope) {
        this.$http = $http;
        this.CONSTANT = CONSTANT;
        this.Accident = Accident;
        this.userData = AuthToken.get();
        this.selectedCity = this.userData.cities.find(e => e.is_selected);
        this.selectedDate = SidebarCalendar.get();
        this.getAccidents(this.selectedDate);
        $rootScope.$on('changeMainCalendar', (event, args) => {
            this.getAccidents(args.date.format('DD.MM.YYYY'));
        });
        // $interval(() => this.getAccidents(), 30*1000);
    }

    getAccidents(date) {
        this.Accident.query({date}, response => {
            this.accidents = response.data;

            this.map = this.map || {
                center: {
                    lat: this.selectedCity.latitude,
                    lng: this.selectedCity.longitude,
                    zoom: this.selectedCity.zoom
                },
                markers: {}
            };

            this.accidents.forEach((obj, index) => {
                this.map.markers['accident_'+index] = {
                    lat: +obj.latitude,
                    lng: +obj.longitude,
                    message: obj.description || null,
                    icon: {
                        iconUrl: (function () {
                            if (obj.is_false) return 'images/icons/accident-marker_yellow.png';
                            else if (obj.holder_id) return 'images/icons/accident-marker_red.png';
                            return 'images/icons/accident-marker_green.png';
                        }()),
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                        popupAnchor: [0, -16]
                    }
                };
            });

            this.$http.get(this.CONSTANT.API_URL+'/users').then(response => {
                this.commissioners = response.data;
                console.log('commissioners', this.commissioners);

                this.commissioners.forEach((obj, index) => {
                    this.map.markers['commissioner_'+index] = {
                        commissioner_id: obj.id,
                        lat: +obj.latitude,
                        lng: +obj.longitude,
                        message: obj.description || null,
                        icon: {
                            iconUrl: (function () {
                                if (obj.busy) return 'images/icons/car_red.png';
                                return 'images/icons/car_green.png';
                            }()),
                            iconSize: [36, 20],
                            popupAnchor:  [0, -10]
                        }
                    };
                });
            }, error => {
                console.log(error);
            });
        }, error => {
            console.log(error);
        });
    }
}
