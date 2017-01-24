export default class {
    constructor($http, CONSTANT, $localStorage, $httpParamSerializerJQLike) {
        this.$http = $http;
        this.CONSTANT = CONSTANT;
        this.$localStorage = $localStorage;
        this.$httpParamSerializerJQLike = $httpParamSerializerJQLike;
    }

    login(user) {
        return this.$http.post(this.CONSTANT.API_URL+'/users', this.$httpParamSerializerJQLike(user), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
    logout() {
        this.$localStorage.$reset();
    }
}
