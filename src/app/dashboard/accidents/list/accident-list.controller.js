export default class {
    constructor($state, Accident, $rootScope, $http, CONSTANT) {
        this.$state = $state;
        this.Accident = Accident;

        this.newAccident = {};
        console.log('reload');

        Accident.query({}, response => {
            this.accidents = response.data;

            this.map = {
                center: {
                    lat: 54.7284569,
                    lng: 55.9806979,
                    zoom: 10
                },
                markers: {}
            };

            this.accidents.forEach((obj, index)=> {
                this.map.markers['accident_'+index] = {
                    lat: +obj.latitude,
                    lng: +obj.longitude,
                    message: obj.description,
                    icon: {
                        iconUrl: 'images/icons/accident-marker_green.png',
                        iconSize: [44, 44],
                        popupAnchor:  [0, -22]
                    }
                };
            });
        }, err => {
            console.log(err);
        });

        $rootScope.$on('leafletDirectiveMap.createAccidentMap.click', (event, args) => {
            const latlng = args.leafletEvent.latlng;
            console.log(args);

            $http.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    key: CONSTANT.API_KEY,
                    latlng: `${latlng.lat},${latlng.lng}`,
                    language: 'ru'
                }
            }).then(response => {
                const address = response.data.results[0].formatted_address;
                const addressArray = address.split(',');
                let formatted = (addressArray[0] || '') + (addressArray[1] ? ',' + addressArray[1] : '');
                if (!addressArray[0] || formatted.indexOf('Unnamed Road') != -1) {
                    formatted = 'Адрес не установлен';
                }

                console.log(latlng);
                console.log(formatted);

                this.newAccident.address = formatted;
            });
        });
    }

    addAccident() {
        this.Accident.save(this.newAccident, res => {
            this.$state.go('accidents.edit', {id: res.crash_id}, {reload: true});
        });
    }
}
