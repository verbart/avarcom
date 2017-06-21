export default class {
  constructor($http, $localStorage, CONSTANT, ngIntroService) {
    this.$http = $http;
    this.$localStorage = $localStorage;
    this.CONSTANT = CONSTANT;
    this.ngIntroService = ngIntroService;
  }

  login(user) {
    return this.$http.post(this.CONSTANT.API_URL_V2+'/login', user);
  }
  logout() {
    this.CONSTANT.OneSignal.push(['sendTags', {
      city: null
    }]);
    this.ngIntroService.clear();
    this.$localStorage.$reset();
  }
  confirmToken() {
    return this.$http.get(this.CONSTANT.API_URL_V2+'/auth-confirmation')
  }
}
