export default class AccidentListCtrl {
    constructor($stateParams, $state, Accident) {
        this.$state = $state;
        this.Accident = Accident;

        this.id = $stateParams.id;
        this.accidents = Accident.query(res => {
            this.editable = this.accidents.find(e => e.id == this.id);
        });
    }

    editAccident() {
        this.Accident.update(this.editable, res => {
            this.$state.go('accidents.create', {}, {reload: true});
        });
    }
}
