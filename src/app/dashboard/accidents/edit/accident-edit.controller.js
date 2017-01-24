export default class {
    constructor($stateParams, $state, Accident) {
        this.$state = $state;
        this.Accident = Accident;

        this.id = $stateParams.id;
        Accident.query(res => {
            console.log('result', res);
            this.editable = res.find(e => e.crash_id == this.id);
        });
    }

    editAccident() {
        this.Accident.update(this.editable, () => {
            this.$state.go('accidents.create', {}, {reload: true});
        });
    }
}
