(function () {
    "use strict";
    angular
        .module("ageRangeInfoManagement")
        .controller("PersonListCtrl", ['personResource', 'dataSearchService', PersonListCtrl]);

    function PersonListCtrl(personResource, dataSearchService) {
        var vm = this;
        
        //Object definition for datbinding for the search functionality
        vm.searchInput = {
            firstName: '',
            lastName: ''
        };
        
        //Retrives the person information from the database - Call the GET Api
        personResource.query({ search: vm.searchInput },function (data) {
            vm.persons = data;
        });

        //Filter for the Client side search - Dynamic reflection on the table while the user enters data 
        // on input text boxes for 'first name' & 'last name'
        vm.searchImmediate = function (item) {
            if ((vm.searchInput.firstName.length == 0 ? true : (item.firstName.toLowerCase().indexOf(vm.searchInput.firstName.toLowerCase()) >= 0)) &&
               (vm.searchInput.lastName.length == 0 ? true : (item.lastName.toLowerCase().indexOf(vm.searchInput.lastName.toLowerCase()) >= 0))) {
                return true;
            }
            return false;
        }

        // Calls the Server side search functionality - a required feature in multi user environment
        vm.search = function () {
            var searchEntity = vm.searchInput;
            dataSearchService.getPersons(searchEntity).then(function (d) {
                vm.persons = d;
            });
        }

        // Resets the search input boxes and the table
        vm.resetSearch = function () {
            vm.searchInput = {
                firstName: '',
                lastName: ''
            };

            personResource.query(function (data) {
                vm.persons = data;
            });
        }

        // Deletes the person with the corresponding ID
        vm.deleteClick = function (id) {
            if (confirm("Delete this Person's information ?")) {
                dataSearchService.deletePerson(id).then(function (d) {
                    // Get index of this person
                    var index = vm.persons.map(function (p)
                    { return p.id; }).indexOf(id);
                    // Remove person from array
                    vm.persons.splice(index, 1)
                });
            }
        }
    }
}());
