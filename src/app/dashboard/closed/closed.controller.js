export default class {
  constructor(moment, $state, $scope, $uibModal, $stateParams, Closed, $rootScope, $interval) {
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;
    this.$uibModal = $uibModal;
    this.Closed = Closed;
    this.period = {
      from: moment().subtract(1, 'day'),
      to: moment()
    };

    this.getAccidents();
    const interval = $interval(() => this.getAccidents(), 20*1000);
    $scope.$on('$destroy', () => $interval.cancel(interval));

    $rootScope.$on('updateClosedCounter', (event, args) => {
      this.closedCounter = args;
    });
  }

  getAccidents() {
    this.Closed.query({
      startTime: this.period.from.format('X'),
      endTime: this.period.to.format('X')
    }, response => {
      if (response.data.length) {
        this.accidents = response.data;
        this.$rootScope.$emit('updateClosedCounter', this.accidents.filter(obj => !obj.is_confirmed).length);
        console.log(this.$stateParams);
        this.$state.go('dashboard.closed.edit', {id: this.$stateParams.id || this.accidents[0].crash_id});
      }
    }, error => {
      console.log(error);
    });
  }
  openDateRangeModal() {
    const modalInstance = this.$uibModal.open({
      component: 'periodModal',
      size: 'xs',
      resolve: {
        period: () => this.period
      }
    });

    modalInstance.result.then(result => {
      this.period = result;
      this.getAccidents();
    }, () => {
      console.info('modal-component dismissed at: ' + new Date());
    });
  }
}
