export default function Statistics($resource) {
    return $resource('/api/statistics', {}, {
        get: {
            method: 'POST'
        },
        search: {
            url: '/api/commissioners',
            method: 'POST',
            isArray: true
        }
    });
}
