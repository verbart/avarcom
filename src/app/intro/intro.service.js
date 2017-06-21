export default class {
  constructor($cookies, ngIntroService) {
    this.$cookies = $cookies;
    this.ngIntroService = ngIntroService;
    this.options = {
      steps: [],
      showStepNumbers: false,
      showBullets: true,
      exitOnOverlayClick: false,
      exitOnEsc: true,
      disableInteraction: true,
      scrollToElement: false,
      showProgress: false,
      nextLabel: 'Далее',
      prevLabel: 'Назад',
      skipLabel: 'Пропустить обзор',
      doneLabel: 'Завершить'
    };
  }
  getOptions() {
    return this.options;
  }
  setOptions(options = this.options) {
    this.options = options;
    this.ngIntroService.setOptions(this.options);
  }
  start(step = 1) {
    this.ngIntroService.clear();
    this.setOptions();

    this.ngIntroService.onChange(() => {
      angular.element('body').addClass('intro');
    });

    this.ngIntroService.onExit(() => {
      this.$cookies.put('intro_v2', true);
      angular.element('body').removeClass('intro');
    });

    this.ngIntroService.start(step);
  }
}
