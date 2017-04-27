export default class {
  constructor(User, AuthData, $uibModal, $interval, $scope) {
    this.$uibModal = $uibModal;
    this.userData = AuthData.get();
    this.User = User;

    this.getUsers(this.selectedDate);

    // const interval = $interval(() => this.getUsers(), 60*1000);
    // $scope.$on('$destroy', () => $interval.cancel(interval));
  }

  getUsers() {
    this.User.query(response => {
      this.users = response.data;
      console.log(response);
    });
  }
  changeStatus(commissioner) {
    this.User.block({id: commissioner.user_id}, {
      block: !commissioner.is_blocked
    }, response => {
      console.log(response);
      commissioner.is_blocked = !commissioner.is_blocked;
    });
  }
  addUser() {
    const modalInstance = this.$uibModal.open({
      component: 'newUserModal',
      size: 'sm',
      resolve: {
        cities: () => this.userData.cities,
      }
    });

    modalInstance.result.then(result => {
      this.users.push(result.commissioner);
    }, () => {
      console.info('modal-component dismissed at: ' + new Date());
    });
  }
}
