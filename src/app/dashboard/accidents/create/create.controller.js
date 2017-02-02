export default class {
    constructor($state, Accident, Geocoding, $scope) {
        this.$state = $state;
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
                    popupAnchor:  [0, -16]
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
    addAccident() {
        if (!this.newAccident.latitude) {
            this.errors.locationExist = true;
            return;
        }
        this.newAccident.crash_date = this.newAccident.date.format('DD.MM.YYYY');

        // if (!this.newAccident.latitude) {
        //     this.Geocoding.getLocation(this.newAccident.address, response => {
        //         this.newAccident.latitude = response.lat;
        //         this.newAccident.longitude = response.lng;
        //         this.saveAccident();
        //     });
        // } else {
        //     this.saveAccident();
        // }

        console.log(this.newAccident);
        this.saveAccident();
    }
    saveAccident() {
        this.Accident.save(this.newAccident, response => {
            console.log('Created accident:', response);
            this.$state.go('dashboard.accidents.readOne', {id: 'response.data.crash_id'}, {reload: true});
        });
    }
}
