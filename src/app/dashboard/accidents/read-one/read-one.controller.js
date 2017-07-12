export default class {
  constructor($stateParams, $state, Accident) {
    this.Accident = Accident;

    Accident.get({id: $stateParams.id}, response => {
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
    }, error => {
      console.log(error);
      $state.go('dashboard.accidents', {}, {reload: true})
    });
  }

  interacted(field) {
    return this.submitted || field.$dirty;
  }
  sendAccident() {
    this.Accident.update({id: this.selected.crash_id}, this.selected, () => {
      this.$state.go('dashboard.accidents.readOne', {id: this.selected.crash_id}, {reload: true});
    }, error => {
      console.log(error);
    });
  }
}
