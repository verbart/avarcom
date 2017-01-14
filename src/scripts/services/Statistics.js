export default function Statistics($resource) {
    return $resource('/api/statistics', {}, {
        get: {
            method: 'POST'
        }
    });
}
