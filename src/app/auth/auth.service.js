export default class {
  constructor($http, $localStorage, CONSTANT, ngIntroService, AuthData) {
    this.$http = $http;
    this.$localStorage = $localStorage;
    this.CONSTANT = CONSTANT;
    this.ngIntroService = ngIntroService;
    this.AuthData = AuthData;
  }

  login(user) {
    return this.$http.post(this.CONSTANT.API_URL_V2+'/login', user);
  }
  getUserRole() {
    return this.AuthData.get('type');
  }
  isUserRole(...roles) {
    return !!roles.filter(role => role === this.getUserRole()).length
  }
  confirmToken() {
    return this.$http.get(this.CONSTANT.API_URL_V2+'/auth-confirmation')
  }
  logout() {
    this.CONSTANT.OneSignal.push(['sendTags', {
      city: null
    }]);
    this.ngIntroService.clear();
    this.$localStorage.$reset();
  }
}
