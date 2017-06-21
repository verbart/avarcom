export default class {
  constructor($state, $cookies, AuthData, IntroService, ngIntroService) {
    this.$cookies = $cookies;
    this.userData = AuthData.get();

    if (!this.$cookies.get('intro_cabinet-account')) {
      const introSteps = [
        {
          element: document.getElementById('intro-step-cabinet-notifications'),
          intro: 'Включите уведомдения, если хотите узнавать о каждой новой аварии',
          position: 'bottom'
        },
        {
          element: document.getElementById('intro-step-cabinet-users'),
          intro: 'Перейдём к разделу управления пользователями',
          position: 'bottom'
        }
      ];

      const introOptions = IntroService.getOptions();
      introOptions.steps = introSteps;
      introOptions.doneLabel = 'Перейти';
      IntroService.setOptions(introOptions);
      setTimeout(() => {
        IntroService.start();
        ngIntroService.onComplete(() => {
          $state.go('cabinet.users');
        });
      }, 1000);
      this.$cookies.put('intro_cabinet-account', true);
    }
  }
}
