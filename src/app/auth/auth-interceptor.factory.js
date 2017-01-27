export default function (AuthToken, $q, $location, $localStorage, CONSTANT) {
    return {
        request: function addToken(config) {
            if (config.url.indexOf(CONSTANT.API_URL) != -1) {
                const data = AuthToken.get();

                if (data) {
                    config.headers = config.headers || {};
                    config.headers.token = data.token;
                }
            }

            return config;
        },
        responseError: function (response) {
            if (response.status === 401) {
                $localStorage.$reset();
                $location.path('/login');
            }

            return $q.reject(response);
        }
    };
}
