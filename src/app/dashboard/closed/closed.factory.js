export default function Closed($resource) {
    return $resource('/api/closed/:id', {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        });
}
