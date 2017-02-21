export default class {
  constructor($state, $scope, $stateParams, Closed, $rootScope, $interval) {
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;
    this.Closed = Closed;

    this.getAccidents();
    const interval = $interval(() => this.getAccidents(), 4000);
    $scope.$on('$destroy', () => $interval.cancel(interval));

    $rootScope.$on('updateClosedCounter', (event, args) => {
      this.closedCounter = args;
    });
  }

  getAccidents() {
    this.Closed.query(response => {
      this.accidents = response.data;
      this.$rootScope.$emit('updateClosedCounter', this.accidents.filter(obj => !obj.is_confirmed).length);
      this.$state.go('dashboard.closed.edit', {id: this.$stateParams.id || this.accidents[0].crash_id});
    }, error => {
      console.log(error);
    });
  }
}
