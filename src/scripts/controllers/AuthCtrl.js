export default class {
    constructor($resource) {
        this.$resource = $resource;
        this.isLoginError = false;
    }

    login() {
        this.isLoginError = true;
    }
    recoverPassword() {
        this.isLoginError = true;
    }
}
