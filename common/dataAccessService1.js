(function () {

    angular.module('common.services')
        .factory('dataService', ['$q', '$timeout', '$http', '$state', 'appSettings', dataService]);

    function dataService($q, $timeout, $http, $state, appSettings) {

        var _getPersons = function (searchEntity) {
            var persons = [];
            $http.post(appSettings.serverPath + "/api/persons/search", searchEntity)
                .then(function (result) {
                    persons = result.data;

                }, function (error) {
                    alert("search fails");
                });
         }

        this.insertData = function (person) {
            $http.post(appSettings.serverPath + "/api/persons", person)
              .then(function (result) {
                  //Update person object
                  //person = result.data;
                  // Display Success message
                  //alert("Save Successful");
                  $state.go('personList');
              }, function (error) {
                  alert("Error whilte adding" + error);
              });
        }

        this.updateData = function (person) {
            $http.put(appSettings.serverPath + "/api/persons/" + person.id , person)
            .then(function (result) {
                //Update person object
                //person = result.data;
                //Display Success message
                //alert("Update Successful");
                $state.go('personList');
            }, function (error) {
                alert("Error whilte updating" + error);
            });
        }

        return {
            getPersons: _getPersons
        }
    }
}());