export default class {
    constructor(AuthService, $state, AuthToken) {
        this.AuthService = AuthService;
        this.$state = $state;
        this.AuthToken = AuthToken;
        this.user = {};
        this.loginError = null;
    }

    login() {
        this.AuthService.login(this.user).then(
            res => {
                console.log(res);
                this.AuthToken.set(res.data.token);
                this.$state.go('dashboard');
            },
            error => {
                console.log(error);
                this.loginError= 'Неправильное имя пользователя или пароль';
            }
        );
    }
}
