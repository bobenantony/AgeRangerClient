(function () {

    angular.module('common.services')
        .service('dataService', ['$http', '$state', 'appSettings', dataService]);


    function dataService($http,$state, appSettings) {

        this.insertData = function (person) {
            $http.post(appSettings.serverPath + "/api/persons", person)
              .then(function (result) {
                  // Display Success message
                  alert("Insert Successful");
                  $state.go('personList');
              }, function (error) {
                  alert("Error while adding" + error);
              });
        }

        this.updateData = function (person) {
            $http.put(appSettings.serverPath + "/api/persons/" + person.id , person)
            .then(function (result) {
                // Display Success message
                alert("Update Successful");
                $state.go('personList');
            }, function (error) {
                alert("Error while updating " + error);
            });
        }

    }
}());