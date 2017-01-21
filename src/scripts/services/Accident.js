export default function Accident($resource, API) {
    return $resource(API+'/events/:id', {id: '@id'});
}
