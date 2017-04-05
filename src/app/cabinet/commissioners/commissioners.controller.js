export default class {
  constructor(Commissioner, AuthData, $uibModal, $interval, $scope) {
    this.$uibModal = $uibModal;
    this.userData = AuthData.get();
    this.Commissioner = Commissioner;

    this.getCommissioners(this.selectedDate);

    // const interval = $interval(() => this.getCommissioners(), 60*1000);
    // $scope.$on('$destroy', () => $interval.cancel(interval));
  }

  getCommissioners() {
    this.Commissioner.query(response => {
      this.commissioners = response.data;
      console.log(response);
    });
  }
  changeStatus(commissioner) {
    this.Commissioner.block({id: commissioner.user_id}, {
      block: !commissioner.is_blocked
    }, response => {
      console.log(response);
      commissioner.is_blocked = !commissioner.is_blocked;
    });
  }
  addCommissioner() {
    const modalInstance = this.$uibModal.open({
      component: 'newCommissionerModal',
      size: 'sm',
      resolve: {
        cities: () => this.userData.cities,
      }
    });

    modalInstance.result.then(result => {
      this.commissioners.push(result.commissioner);
    }, () => {
      console.info('modal-component dismissed at: ' + new Date());
    });
  }
}
