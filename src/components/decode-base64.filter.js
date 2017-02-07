export default function () {
    return function(string) {
      try {
        return decodeURIComponent(escape(window.atob(string)));
      } catch(e) {
        console.error('Passed param is not in Base64.');
        return string;
      }
    }
}
