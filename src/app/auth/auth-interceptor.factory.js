export default function ($q, $injector, CONSTANT, AuthToken) {
  return {
    request: function (config) {
      if ((config.url.indexOf(CONSTANT.API_URL) === 0) || (config.url.indexOf(CONSTANT.API_URL_V2) === 0)) {
        const token = AuthToken.get();

        if (token) {
          config.headers = config.headers || {};
          config.headers.token = token;
        }
      }

      return config;
    },
    responseError: function (response) {
      if (response.status === 401 || response.status === 403) {
        $injector.get('$state').go('logout');
      }

      return $q.reject(response);
    }
  };
}
