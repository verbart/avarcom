export default class {
  constructor($state, $stateParams, Closed) {
    Closed.query(response => {
      this.accidents = response.data;
      $state.go('dashboard.closed.edit', {id: $stateParams.id || this.accidents[0].crash_id});
    }, error => {
      console.log(error);
    });
  }
}
