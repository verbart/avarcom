export default function ($localStorage) {
  const dataKey = 'auth-data';

  function set(key, data) {
    if (key && data) {
      $localStorage[dataKey][key] = data;
    } else if (key) {
      $localStorage[dataKey] = key;
    }
  }

  function get(key) {
    return key ? $localStorage[dataKey][key] : $localStorage[dataKey];
  }

  return {
    get,
    set
  };
}
