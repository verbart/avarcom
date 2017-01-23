export default function ($resource, CONSTANT) {
    return $resource(CONSTANT.API_URL+'/events/:id', {id: '@id'});
}
