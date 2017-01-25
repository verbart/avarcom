export default class {
    constructor($stateParams, $state, Accident) {
        this.$state = $state;
        this.Accident = Accident;

        Accident.query(response => {
            this.selected = response.data.find(e => e.crash_id == $stateParams.id);

            this.map = {
                center: {
                    lat: +this.selected.latitude,
                    lng: +this.selected.longitude,
                    zoom: 16
                },
                markers: {
                    accident: {
                        lat: +this.selected.latitude,
                        lng: +this.selected.longitude,
                        message: this.selected.description,
                        focus: true,
                        icon: {
                            iconUrl: 'images/icons/accident-marker_green.png',
                            iconSize: [44, 44],
                            popupAnchor:  [0, -22]
                        }
                    },
                }
            };
        }, err => {
            console.log(err);
        });
    }
}
