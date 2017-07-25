(function () {

    angular.module('common.services')
        .factory('dataSearchService', ['$http', 'appSettings', dataSearchService]);

    function dataSearchService($http, appSettings) {
        var promise=null;
        var myService = {
            getPersons: function (searchEntity) {
                if (!promise) {
                    // $http returns a promise, which has a then function, which also returns a promise
                    promise = $http.post(appSettings.serverPath + "/api/persons/search", searchEntity).then(function (response) {
                        // The then function here is an opportunity to modify the response
                        console.log(response);
                        promise = null;
                        // The return value gets picked up by the then in the controller.
                        return response.data;
                    });
                }
                // Return the promise to the controller
                return promise;
            },

            deletePerson: function (id) {
                if (!promise) {
                    // $http returns a promise, which has a then function, which also returns a promise
                    promise = $http.delete(appSettings.serverPath + "/api/persons/" + id).then(function (response) {
                        // The then function here is an opportunity to modify the response
                        console.log(response);
                        promise = null;
                        // The return value gets picked up by the then in the controller.
                        return id;
                    });
                }
                // Return the promise to the controller
                return promise;
            }
        };

        return myService;
    }
}());