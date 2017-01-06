export default function Accident($resource) {
    return $resource('/api/accidents/:id', {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        });
}
