export default class {
  constructor(moment, $cookies, $state, $scope, $uibModal, $stateParams, Closed, $rootScope, $interval, ngIntroService, IntroService) {
    this.$state = $state;
    this.$cookies = $cookies;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;
    this.$uibModal = $uibModal;
    this.Closed = Closed;
    this.period = {
      from: moment('01.02.2017', 'DD.MM.YYYY'),
      to: moment()
    };

    this.getAccidents();
    const interval = $interval(() => this.getAccidents(), 20*1000);
    $scope.$on('$destroy', () => $interval.cancel(interval));

    $rootScope.$on('updateClosedCounter', (event, args) => {
      this.closedCounter = args;
    });

    const introOptions = IntroService.getOptions();

    if (!this.$cookies.get('intro_v2')) {
      const introSteps = [
        {
          element: document.getElementById('intro-step-5'),
          intro: 'Можно просмотреть происшествия за определённый период времени',
          position: 'bottom'
        },
        {
          element: document.getElementById('intro-step-6'),
          intro: 'Можно просмотреть отдельный инцидент, или же отредактировать и подтвердить его завершение',
          position: 'right'
        },
        {
          element: document.getElementById('intro-step-7'),
          intro: 'Рассмотрим раздел статистики',
          position: 'bottom'
        }
      ];
      introOptions.steps = introSteps;
      introOptions.doneLabel = 'Перейти';
      IntroService.setOptions(introOptions);
      IntroService.start();
      ngIntroService.onComplete(() => {
        $state.go('dashboard.statistics');
      });
    }
  }

  getAccidents() {
    this.Closed.query({
      startTime: this.period.from.format('X'),
      endTime: this.period.to.format('X')
    }, response => {
      this.accidents = response.data;
      this.$rootScope.$emit('updateClosedCounter', this.accidents.filter(obj => !obj.is_confirmed).length);
    }, error => {
      console.log(error);
    });
  }
  openDateRangeModal() {
    this.$uibModal.open({
      component: 'periodModal',
      size: 'xs',
      resolve: {
        period: () => angular.copy(this.period)
      }
    }).result.then(result => {
      this.period = result;
      this.getAccidents();
    }, () => {
      console.info('modal-component dismissed at: ' + new Date());
    });
  }
}
