export default function ($resource, $filter, CONSTANT) {
    return $resource(CONSTANT.API_URL+'/events/:id', {id: '@id'}, {
        query: {
            isArray: true,
            transformResponse: function(data) {
                data = JSON.parse(data);

                data.forEach(obj => {
                    obj.address = $filter('decodeBase64')(obj.address);
                    obj.crash_date = $filter('decodeBase64')(obj.crash_date);
                    obj.description = $filter('decodeBase64')(obj.description);
                    obj.createdDate = {
                        date: $filter('date')(obj.created*1000, 'dd.MM.yyyy'),
                        time: $filter('date')(obj.created*1000, 'HH:ss'),
                    };
                    obj.holder_id = 0 || null;
                });

                return data;
            }
        }
    });
}
