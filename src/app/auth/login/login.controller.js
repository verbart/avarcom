export default class {
  constructor(AuthService, AuthData, AuthToken, $state) {
    this.$state = $state;
    this.AuthService = AuthService;
    this.AuthData = AuthData;
    this.AuthToken = AuthToken;
    this.user = {};
    this.errorCode = null;
  }

  login() {
    this.AuthService.login(this.user).then(
      response => {
        console.log(response);
        this.AuthData.set(response.data);
        this.AuthToken.set(response.headers('token'));

        this.$state.go('dashboard');
      },
      error => {
        console.log(error);
        this.errorCode = error.status;
      }
    );
  }
}
