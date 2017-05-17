export default function ($resource, $filter, CONSTANT) {
    const transformResponse = function (obj) {
        return obj;
    };

    return $resource(CONSTANT.API_URL_V2+'/account', {
        get: {
            interceptor: {
                response: function(response) {
                    // transformResponse(response.data);
                    return response;
                }
            }
        },
        query: {
            isArray: true,
            interceptor: {
                response: function(response) {
                    console.log('init response', response);
                    // response.data.forEach(obj => transformResponse(obj));
                    return response;
                }
            }
        }
    });
}
