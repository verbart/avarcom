export default class {
    constructor(Accident, AuthToken) {
        this.Accident = Accident;
        this.userData = AuthToken.get();
        this.selectedCity = this.userData.cities.find(e => e.isSelected);

        Accident.query({}, response => {
            this.accidents = response.data;

            this.map = {
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
                        iconSize: [44, 44],
                        popupAnchor:  [0, -22]
                    }
                };
            });
        }, error => {
            console.log(error);
        });
    }
}
