export default function ($q, $injector, CONSTANT, AuthToken) {
  return {
    request: function (config) {
      if (
        (config.url.indexOf(CONSTANT.API_URL) === 0) ||
        (config.url.indexOf(CONSTANT.API_URL_V2) === 0)
      ) {
        const token = AuthToken.get();

        config.headers = config.headers || {};
        config.headers.token = token || '';
      } else if (
        (config.url.indexOf('views/app/dashboard') === 0) ||
        (config.url.indexOf('views/app/cabinet') === 0)
      ) {
        const deferred = $q.defer();

        $injector.get('AuthService').confirmToken().then(() => {
          deferred.resolve(config);
        }, () => {
          deferred.reject(config);
        });

        return deferred.promise;
      }

      return config;
    },
    responseError: function (response) {
      if (
        ((response.config.url.indexOf(CONSTANT.API_URL) === 0) ||
        (response.config.url.indexOf(CONSTANT.API_URL_V2) === 0)) &&
        (response.status === 401 || response.status === 403)
      ) {
        $injector.get('$state').go('logout');
      }

      return $q.reject(response);
    }
  };
}
