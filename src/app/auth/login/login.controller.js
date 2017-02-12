export default class {
    constructor(AuthService, $state, AuthData) {
        this.AuthService = AuthService;
        this.$state = $state;
        this.AuthData = AuthData;
        this.user = {};
        this.loginError = null;
    }

    login() {
        this.AuthService.login(this.user).then(
            res => {
                console.log(res);
                this.AuthData.set(res.data);
                console.log(this.AuthData.get());
                this.$state.go('dashboard');
            },
            error => {
                console.log(error);
                this.loginError= 'Неправильное имя пользователя или пароль';
            }
        );
    }
}
