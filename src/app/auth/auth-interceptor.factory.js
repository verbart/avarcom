export default function (AuthToken, $q, $location, $localStorage, CONSTANT) {
  return {
    request: function addToken(config) {
      if (config.url.indexOf(CONSTANT.API_URL) != -1) {
        const token = AuthToken.get();

        if (token) {
          config.headers = config.headers || {};
          config.headers.token = token;
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
