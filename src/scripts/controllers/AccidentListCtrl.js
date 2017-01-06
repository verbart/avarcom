export default class AccidentListCtrl {
    constructor(Accident) {
        this.Accident = Accident;
        this.accidents = Accident.query();
        this.newAccident = {};
    }

    addAccident() {
        if (!Object.keys(this.newAccident).length) return;

        this.Accident.save(this.newAccident, res => {
            this.accidents.push(res);
            this.newAccident = {};
            console.log('Accident added!', res);
        });
    }
}
