export default class {
  constructor(AuthService, $state, AuthData) {
    this.AuthService = AuthService;
    this.$state = $state;
    this.AuthData = AuthData;
    this.user = {};
    this.errorCode = null;
  }

  login() {
    this.AuthService.login(this.user).then(
      response => {
        console.log(response);
        this.errorCode = null;
        this.AuthData.set(response.data);
        this.$state.go('dashboard');
      },
      error => {
        console.log(error);
        this.errorCode = error.status;
      }
    );
  }
}
