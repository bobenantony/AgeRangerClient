angular.module('common.services')
    .factory('dataService', ['$http', 'appSettings', function ($http, appSettings) {

        var urlBase = appSettings.serverPath + '/api/persons';
        var dataService = {};

        dataService.getPersons = function (searchEntity, MODE) {
            if (MODE === 'READ') {
                return $http.get(urlBase, searchEntity);
            } else {
                return $http.post(urlBase + '/search', searchEntity);
            }
        };

        dataService.getPerson = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        dataService.insertPerson = function (person) {
            return $http.post(urlBase, person);
        };

        dataService.updatePerson = function (person) {
            return $http.put(urlBase + '/' + person.id, person)
        };

        dataService.deletePerson = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        return dataService;
    }]);