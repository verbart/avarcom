export default class {
    constructor($state, Accident, Geocoding, $scope) {
        this.$state = $state;
        this.Geocoding = Geocoding;
        this.Accident = Accident;
        this.newAccident = {};

        $scope.$on('leafletDirectiveMap.createAccidentMap.click', (event, args) => {
            const latlng = args.leafletEvent.latlng;

            this.Geocoding.getAddress(latlng, response => {
                this.newAccident.address = response;
                this.newAccident.latitude = latlng.lat;
                this.newAccident.longitude = latlng.lng;
            });
        });
    }

    addAccident() {
        this.newAccident.commissar_id = 9;
        this.newAccident.crash_date = new Date().getTime();

        this.Accident.save(this.newAccident, response => {
            console.log(response);
            this.$state.go('dashboard.accidents.readOne', {id: 'response.data.crash_id'}, {reload: true});
        });
    }
}
