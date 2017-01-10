export default class {
    constructor($state, $stateParams, Closed) {
        this.Closed = Closed;
        this.id = $stateParams.id;
        this.accidents = Closed.query(res => {
            if (this.id) this.editable = res.find(e => e.id == this.id);
            else $state.go('closed', {id: res[0].id});
        });
    }
    editAccident() {
        this.Closed.update(this.editable, () => {
            alert('Данные об аварии обновлены');
        });
    }
}
