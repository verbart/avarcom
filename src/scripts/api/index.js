const accidents = require('./accidents');
const statistics = require('./statistics');


angular.module('avarcom').run(function($httpBackend) {
    $httpBackend.whenGET('/api/accidents').respond(() => [200, accidents.filter(e => e.closed == false)]);

    $httpBackend.whenPOST('/api/accidents').respond(function (method, url, data) {
        const accident = JSON.parse(data);

        accident.id = Math.random();
        accident.closed = false;

        accidents.unshift(accident);

        return [201, accident];
    });

    $httpBackend.whenPUT(/^\/api\/accidents/).respond(function (method, url, data) {
        const accident = accidents.findIndex(e => e.id == JSON.parse(data).id);

        accidents[accident] = JSON.parse(data);

        return [200, data];
    });

    //////////////// CLOSED ///////////////////

    $httpBackend.whenGET('/api/closed').respond(() => [200, accidents.filter(e => e.closed == true)]);

    $httpBackend.whenPOST('/api/closed').respond(function (method, url, data) {
        const accident = JSON.parse(data);

        accident.id = Math.random();
        accidents.push(accident);

        return [201, accident];
    });

    $httpBackend.whenPUT(/^\/api\/closed/).respond(function (method, url, data) {
        const accident = accidents.findIndex(e => e.id == JSON.parse(data).id);

        accidents[accident] = JSON.parse(data);

        return [200, data];
    });

    //////////////// STATISTICS ///////////////////

    $httpBackend.whenPOST('/api/statistics').respond(statistics);



    $httpBackend.whenGET(/\.html$/).passThrough();
});
