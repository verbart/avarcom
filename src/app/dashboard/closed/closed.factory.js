export default function Closed(CONSTANT, $resource) {
    return $resource(CONSTANT.API_URL+'/events/:id', {id: '@id'});
}
