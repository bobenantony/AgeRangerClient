(function () {

    angular.module('common.services')
        .service('dataService', ['$q', '$timeout', '$http', '$state', 'appSettings', dataService]);


    function dataService($q, $timeout, $http,$state, appSettings) {

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

        this.deleteData = function (id) {
            dataService.delete(appSettings.serverPath + "/api/persons/" + id)
                .then(function (result) {
                    // Get index of this product
                    var index = vm.person.map(function (p)
                    { return p.id; }).indexOf(id);

                    // Remove product from array
                    vm.person.splice(index, 1);

                    setUIState(pageMode.LIST);
                }, function (error) {
                    handleException(error);
                });
        }
    }
}());