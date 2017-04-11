export default function ($localStorage) {
  const key = 'auth-data';

  function get() {
    return $localStorage[key];
  }
  function set(token) {
    if (token) $localStorage[key] = token;
    else delete $localStorage[key];
  }

  return {
    get,
    set
  };
}
