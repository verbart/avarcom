export default class {
  constructor($http, CONSTANT, $localStorage) {
    this.$http = $http;
    this.CONSTANT = CONSTANT;
    this.$localStorage = $localStorage;
  }

  login(user) {
    return this.$http.post(this.CONSTANT.API_URL+'/login', user);
  }
  logout() {
    this.$localStorage.$reset();
  }
}
