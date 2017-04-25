export default class {
  constructor(AuthService, $state, AuthData, CONSTANT) {
    this.CONSTANT = CONSTANT;
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
        const userData = response.data;

        this.errorCode = null;
        this.AuthData.set(userData);
        this.CONSTANT.OneSignal.push(['sendTags', {
          city: userData.city,
          name: userData.user_name,
          phone: userData.phone
        }]);

        this.$state.go('dashboard');
      },
      error => {
        console.log(error);
        this.errorCode = error.status;
      }
    );
  }
}
