export default function Statistics($resource, CONSTANT) {
  return $resource(CONSTANT.API_URL_V2 + '/statistic/general');
}
