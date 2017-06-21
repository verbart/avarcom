export default class StatisticsCtrl {
  constructor($scope, $cookies, $state, moment, Statistics, IntroService, ngIntroService) {
    this.$scope = $scope;
    this.$state = $state;
    this.$cookies = $cookies;
    this.IntroService = IntroService;
    this.ngIntroService = ngIntroService;
    this.Statistics = Statistics;
    this.startDate = moment().subtract(1, 'day');
    this.endDate = moment();

    $scope.$watchGroup([() => this.startDate, () => this.endDate], () => {
      this.getStats();
    });

    this.introSteps = [
      {
        element: document.getElementById('intro-step-statistics-date'),
        intro: 'По умолчанию выводится статистика за день, но ничто не мешает взглянуть, к примеру, на месячный отчёт',
        position: 'bottom'
      },
      {
        element: document.getElementById('intro-step-statistics-users'),
        intro: 'Ниже представлена статистика по всем пользователям, возможен поиск и фильтрация',
        position: 'top'
      },
      {
        element: document.getElementById('intro-step-profile-link'),
        intro: 'Перейдём в Ваш личный кабинет',
        position: 'bottom'
      }
    ];
  }

  getStats() {
    this.Statistics.get({
      startTime: this.startDate.format('X'),
      endTime: this.endDate.format('X'),
      type: 'general'
    }, response => {
      console.log(response);
      this.general = response.general_data;
      this.commissioners = response.commissars;
      this.rating = angular.copy(this.commissioners);

      if (!this.$cookies.get('intro_v2')) {
        const introOptions = this.IntroService.getOptions();
        introOptions.steps = this.introSteps;
        introOptions.doneLabel = 'Перейти';
        this.IntroService.setOptions(introOptions);
        this.IntroService.start();
        this.ngIntroService.onComplete(() => {
          this.$state.go('cabinet.account');
        });
      }
    }, error => {
      console.log(error);
    });
  }
}
