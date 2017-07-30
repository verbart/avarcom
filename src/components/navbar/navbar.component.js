export default {
  templateUrl: 'views/components/navbar/navbar.html',
  controller: class {
    constructor(
      $state,
      $scope,
      $rootScope,
      $interval,
      $cookies,
      AuthService,
      AuthData,
      CONSTANT,
      Closed,
      IntroService,
      ngIntroService
    ) {
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$cookies = $cookies;
      this.CONSTANT = CONSTANT;
      this.Closed = Closed;
      this.AuthService = AuthService;
      this.userData = AuthData.get();
      this.selectedCity = this.userData.cities.find(e => e.is_selected);

      this.getClosedCounter();
      const interval = $interval(() => this.getClosedCounter(), 20*1000);
      $scope.$on('$destroy', () => $interval.cancel(interval));

      $rootScope.$on('updateClosedCounter', (event, args) => {
        this.closedCounter = args;
      });

      const introSteps = [
        {
          element: document.getElementById('intro-step-1'),
          intro: 'Выберите город в котором будете работать',
          position: 'bottom'
        },
        {
          element: document.getElementById('intro-step-2'),
          intro: 'Это список последних произошедших аварий. Кликнув по одной из них, можно просмотреть более подробные сведения о происшествии',
          position: 'right'
        },
        {
          element: document.getElementById('intro-step-3'),
          intro: 'Как добавить новую аварию: Отметьте место аварии на карте, и заполнив форму отправьте её',
          position: 'left'
        },
        {
          element: document.getElementById('intro-step-4'),
          intro: 'Рассмотрим раздел с завершенными событиями...',
          position: 'bottom'
        }
      ];
      if (!this.$cookies.get('intro_accidents')) {
        const introOptions = IntroService.getOptions();
        introOptions.steps = introSteps;
        introOptions.doneLabel = 'Перейти';
        IntroService.setOptions(introOptions);
        setTimeout(() => {
          IntroService.start();
          ngIntroService.onComplete(() => {
            $state.go('dashboard.closed');
          });
        }, 2000);
        this.$cookies.put('intro_accidents', true);
      }
    }

    getClosedCounter() {
      this.Closed.query(response => {
        if (response.data.length) {
          this.$rootScope.$emit('updateClosedCounter', response.data.filter(obj => !obj.is_confirmed).length);
        }
      }, error => {
        console.log(error);
      });
    }
  }
}
