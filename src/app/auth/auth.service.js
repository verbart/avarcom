export default class {
  constructor($http, CONSTANT, $localStorage) {
    this.$http = $http;
    this.CONSTANT = CONSTANT;
    this.$localStorage = $localStorage;
  }

  login(user) {
    return this.$http.post(this.CONSTANT.API_URL_V2+'/login', user);
  }
  logout() {
    this.$localStorage.$reset();
  }
}
