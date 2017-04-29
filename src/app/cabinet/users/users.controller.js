export default class {
  constructor(User, AuthData, CONSTANT, $uibModal, $http, $interval, $scope) {
    this.$uibModal = $uibModal;
    this.userData = AuthData.get();
    this.User = User;

    this.getUsers(this.selectedDate);
    this.rolesOptions = {
      // selectionLimit: 1,
      styleActive: true,
      displayProp: 'label',
      showCheckAll: false,
      showUncheckAll: false
    };
    this.roles = [{id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"} ];
    // this.selectedRole = [this.roles[0]];
    this.selectedRole = [];

    this.onRoleSelect = (role) => {
      console.log(role);

      this.selectedRoleLabel = this.selectedRole.map(item => item.label).join(', ');
    };
    // const interval = $interval(() => this.getUsers(), 60*1000);
    // $scope.$on('$destroy', () => $interval.cancel(interval));
    $http.get(CONSTANT.API_URL+'/levels').then(response => {
      console.log(response);
      $http.get(CONSTANT.API_URL+'/levels/1/roles').then(response => {
        console.log(response);
        $http.get(CONSTANT.API_URL+'/roles/1/cities').then(response => {
          console.log(response);
        }, error => {
          console.log(error);
        });
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
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
