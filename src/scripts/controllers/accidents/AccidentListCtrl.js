export default class {
    constructor($state, Accident) {
        this.$state = $state;
        this.Accident = Accident;
        this.accidents = Accident.query();
        this.newAccident = {};
    }

    addAccident() {
        if (!Object.keys(this.newAccident).length) return;

        this.Accident.save(this.newAccident, res => {
            this.$state.go('accidents.edit', {id: res.id}, {reload: true});
        });
    }
}
