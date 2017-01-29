export default function Statistics($resource, CONSTANT) {
    return $resource(CONSTANT.API_URL+'/statistic');
}
