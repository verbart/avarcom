export default function (AuthToken, $q, $location, $localStorage) {
    function addToken(config) {
        const token = AuthToken.get();

        if (token) {
            config.headers = config.headers || {};
            config.headers.token = token;
        }

        return config;
    }

    return {
        request: addToken,
        responseError: function (response) {
            if (response.status === 401) {
                $localStorage.$reset();
                $location.path('/login');
            }
            return $q.reject(response);
        }
    };
}
