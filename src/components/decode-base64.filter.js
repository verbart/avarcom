export default function (base64) {
    return function(string) {
        if (typeof string !== 'string') {
            console.warn('Element must be a string!');
            return string;
        }

        const testRegExp = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;

        return testRegExp.test(string) ? base64.decode(string) : string;
    }
}
