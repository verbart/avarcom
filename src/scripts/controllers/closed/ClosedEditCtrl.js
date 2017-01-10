export default class {
    constructor($stateParams, $state, Closed) {
        this.$state = $state;
        this.Closed = Closed;

        this.id = $stateParams.id;
        Closed.query(res => {
            this.editable = res.find(e => e.id == this.id);
        });
    }

    editAccident() {
        this.Closed.update(this.editable, () => {
            alert('Данные об аварии обновлены');
        });
    }
}
