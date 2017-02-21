export default function Closed(CONSTANT, $filter, $resource) {
  const transformResponse = function (obj) {
    obj.address = $filter('decodeBase64')(obj.address);
    obj.data.is_confirmed = obj.is_confirmed;
    obj.data.commissar = obj.commissar;

    obj.data.culprit.full_name = $filter('decodeBase64')(obj.data.culprit.full_name);
    obj.data.culprit.car_brand = $filter('decodeBase64')(obj.data.culprit.car_brand);
    obj.data.culprit.car_number = $filter('decodeBase64')(obj.data.culprit.car_number);
    obj.data.culprit.phone = $filter('decodeBase64')(obj.data.culprit.phone);

    obj.data.victim.full_name = $filter('decodeBase64')(obj.data.victim.full_name);
    obj.data.victim.car_brand = $filter('decodeBase64')(obj.data.victim.car_brand);
    obj.data.victim.car_number = $filter('decodeBase64')(obj.data.victim.car_number);
    obj.data.victim.phone = $filter('decodeBase64')(obj.data.victim.phone);

    obj.createdDate = {
      date: $filter('date')(obj.created * 1000, 'dd.MM.yyyy'),
      time: $filter('date')(obj.created * 1000, 'HH:ss'),
    };

    return obj;
  };

  return $resource(CONSTANT.API_URL+'/moderated/:id', {id: '@id'}, {
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
          console.log('init moderated', response);
          response.data.forEach(obj => transformResponse(obj));

          return response;
        }
      }
    },
    update: {
      method: 'PUT'
    },
    send: {
      method: 'POST'
    }
  });
}
