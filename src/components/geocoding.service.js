export default class {
    constructor($http, CONSTANT) {
        this.$http = $http;
        this.CONSTANT = CONSTANT;
    }

    getAddress(latlng, cb) {
        return this.$http.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                key: this.CONSTANT.API_KEY,
                latlng: `${latlng.lat},${latlng.lng}`,
                language: 'ru'
            }}).then(function(response) {
                const address = response.data.results[0].formatted_address;
                const addressArray = address.split(',');
                let formatted = (addressArray[0] || '') + (addressArray[1] ? ',' + addressArray[1] : '');
                if (!addressArray[0] || formatted.indexOf('Unnamed Road') != -1) {
                    formatted = 'Адрес не установлен';
                }

                cb(formatted);
            });
    }
    getLocation(address, cb) {
        return this.$http.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                key: this.CONSTANT.API_KEY,
                address: address,
                // bounds: `${34.172684},${-118.604794}|${34.236144},${-118.500938}`,
                language: 'ru',
                region: 'ru'
            }}).then(function(response) {
                console.log('qw', response);
                if (response.data.status == 'OK') {
                    const location = response.data.results[0].geometry.location;
                    cb(location);
                }
            });
    }

}
