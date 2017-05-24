export default function ($resource, CONSTANT) {
    return $resource(CONSTANT.API_URL_V2+'/users/:id', {id: '@id'}, {
        get: {
            interceptor: {
                response: function(response) {
                    return response;
                }
            }
        },
        query: {
            isArray: true,
            interceptor: {
                response: function(response) {
                    console.log('init response', response);
                    return response;
                }
            }
        },
        block: {
          method: 'POST'
        }
    });
}
