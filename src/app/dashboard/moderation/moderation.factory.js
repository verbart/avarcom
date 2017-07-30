export default function ($resource, $filter, CONSTANT) {
  const transformResponse = function (obj) {
    obj.createdDate = {
      date: $filter('date')(obj.created * 1000, 'dd.MM.yyyy'),
      time: $filter('date')(obj.created * 1000, 'HH:mm'),
    };

    return obj;
  };

  return $resource(CONSTANT.API_URL_V2+'/partners/events/:id', {id: '@id'}, {
    get: {
      interceptor: {
        response: function(response) {
          transformResponse(response.data);
          return response;
        }
      }
    },
    query: {
      isArray: true,
      interceptor: {
        response: function(response) {
          console.log('init response', response);
          response.data.forEach(obj => transformResponse(obj));
          return response;
        }
      }
    },
    moderate: {
      method: 'POST'
    }
  });
}
