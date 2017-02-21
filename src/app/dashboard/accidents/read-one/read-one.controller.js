export default class {
    constructor($stateParams, $state, Accident) {
        this.Accident = Accident;

        Accident.get({id: $stateParams.id, web: true}, response => {
          console.log(response.data);
            this.selected = response.data;
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
                                if (this.selected.status.code > 2) return 'images/icons/accident-marker_yellow.png';
                                else if (this.selected.status.code == 2) return 'images/icons/accident-marker_red.png';
                                return 'images/icons/accident-marker_green.png';
                            }.bind(this)()),
                            iconSize: [32, 32],
                            iconAnchor: [16, 32],
                            popupAnchor: [0, -32]
                        }
                    }
                }
            };
        }, err => {
            console.log(err);
            $state.go('dashboard.accidents', {}, {reload: true})
        });
    }
}
