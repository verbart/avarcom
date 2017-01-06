const accidents = require('./accidents');


angular.module('avarcom').run(function($httpBackend) {
    $httpBackend.whenGET('/api/accidents').respond(accidents);

    $httpBackend.whenPOST('/api/accidents').respond(function (method, url, data) {
        const accident = JSON.parse(data);

        accident.id = Math.random();
        accidents.push(accident);

        return [201, accident];
    });

    $httpBackend.whenPUT(/^\/api\/accidents/).respond(function (method, url, data) {
        const accident = accidents.findIndex(e => e.id == JSON.parse(data).id);

        accidents[accident] = JSON.parse(data);
        console.log(accidents, accident);

        return [201, data];
    });

    $httpBackend.whenGET(/\.html$/).passThrough();
});
