angular.module('common.services')
    .factory('dataFactory', ['$http', 'appSettings', function ($http, appSettings) {

        var urlBase = appSettings.serverPath + '/api/persons';
        var dataFactory = {};

        dataFactory.getPersons = function (searchEntity, MODE) {
            if (MODE === 'READ') {
                return $http.get(urlBase, searchEntity);
            } else {
                return $http.post(urlBase + '/search', searchEntity);
            }
        };

        dataFactory.getPerson = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        dataFactory.insertPerson = function (person) {
            return $http.post(urlBase, person);
        };

        dataFactory.updatePerson = function (person) {
            return $http.put(urlBase + '/' + person.id, person)
        };

        dataFactory.deletePerson = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        return dataFactory;
    }]);