export default class {
    constructor($state, Accident) {
        this.$state = $state;
        this.Accident = Accident;
        this.accidents = Accident.query({}, res => {
            console.log('result', res);
        });
        this.newAccident = {};
    }

    addAccident() {
        if (!Object.keys(this.newAccident).length) return;

        this.Accident.save(this.newAccident, res => {
            this.$state.go('accidents.edit', {id: res.crash_id}, {reload: true});
        });
    }
}
