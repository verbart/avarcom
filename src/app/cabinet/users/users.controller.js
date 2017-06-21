export default class {
  constructor($uibModal, $cookies, $interval, $scope, $state, User, AuthData, IntroService, ngIntroService) {
    this.$scope = $scope;
    this.$state = $state;
    this.$cookies = $cookies;
    this.$uibModal = $uibModal;
    this.IntroService = IntroService;
    this.IntroService = IntroService;
    this.ngIntroService = ngIntroService;
    this.userData = AuthData.get();
    this.User = User;

    this.getUsers(this.selectedDate);

    // const interval = $interval(() => this.getUsers(), 60*1000);
    // $scope.$on('$destroy', () => $interval.cancel(interval));
    this.introSteps = [
      {
        element: document.getElementById('intro-step-cabinet-users-list'),
        intro: `Здесь представлены все пользователи и действия, которые можно к ним применить`,
        position: 'top'
      },
      {
        element: document.getElementById('intro-step-cabinet-add-user'),
        intro: `Нажав на кнопку "Добавить пользователя", и заполнив появившуюся форму, можно добавить нового пользователя. 
                Он получит письмо с инструкциями по дальнейшим действиям на указанный Вами e-mail`,
        position: 'bottom'
      },
      {
        element: document.getElementById('intro-step-help'),
        intro: `Если возникнут вопросы, возможно в разделе помощи найдутся ответы на них. Ну а на этом всё. Удачи!`,
        position: 'bottom'
      }
    ];
  }

  getUsers() {
    this.User.query(response => {
      console.log(response);

      this.users = response.data;

      if (!this.$cookies.get('intro_v2')) {
        setTimeout(() => {
          const introOptions = this.IntroService.getOptions();
          introOptions.steps = this.introSteps;
          introOptions.doneLabel = 'Завершить';
          this.IntroService.setOptions(introOptions);
          this.IntroService.start();
          this.ngIntroService.onComplete(() => {
            this.$state.go('dashboard');
          });
        }, 500);
      }
    });
  }
  changeStatus(user) {
    this.User.block({id: user.user_id}, {
      block: !user.block
    }, response => {
      console.log(response);
      user.block = !user.block;
    });
  }
  addUser() {
    const modalInstance = this.$uibModal.open({
      component: 'newUserModal',
      size: 'md'
    });

    modalInstance.result.then(user => {
      console.log(user);
      this.users.push(user);
    }, () => {
      console.info('modal-component dismissed at: ' + new Date());
    });
  }
}
