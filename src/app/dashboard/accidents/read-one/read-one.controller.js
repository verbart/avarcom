export default class {
    constructor($stateParams, $state, Accident) {
        this.$state = $state;
        this.Accident = Accident;

        Accident.query(response => {
            this.selected = response.data.find(e => e.crash_id == $stateParams.id);
            if (!this.selected) $state.go('dashboard.accidents', {}, {reload: true});

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
                        message: this.selected.description || null,
                        focus: Boolean(this.selected.description),
                        icon: {
                            iconUrl: (function () {
                                if (this.selected.is_false) return 'images/icons/accident-marker_yellow.png';
                                else if (this.selected.holder_id) return 'images/icons/accident-marker_red.png';
                                return 'images/icons/accident-marker_green.png';
                            }.bind(this)()),
                            iconSize: [44, 44],
                            popupAnchor:  [0, -22]
                        }
                    }
                }
            };
        }, err => {
            console.log(err);
        });
    }
}
