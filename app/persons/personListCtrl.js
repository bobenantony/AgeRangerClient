(function () {
    "use strict";
    angular
        .module("ageRangeInfoManagement")
        .controller("PersonListCtrl", ['personResource', 'dataSearchService', PersonListCtrl]);

    function PersonListCtrl(personResource, dataSearchService) {
        var vm = this;
        //var dService = dataService;

        vm.searchInput = {
            firstName: '',
            lastName: ''
        };
        
        //vm.persons = dataService.getAllPersons();
        personResource.query({ search: vm.searchInput },function (data) {
            vm.persons = data;
        });

        vm.searchImmediate = function (item) {
            if ((vm.searchInput.firstName.length == 0 ? true : (item.firstName.toLowerCase().indexOf(vm.searchInput.firstName.toLowerCase()) >= 0)) &&
               (vm.searchInput.lastName.length == 0 ? true : (item.lastName.toLowerCase().indexOf(vm.searchInput.lastName.toLowerCase()) >= 0))) {
                return true;
            }
            return false;
        }

        vm.search = function () {
            var searchEntity = vm.searchInput;
            dataSearchService.getPersons(searchEntity).then(function (d) {
                vm.persons = d;
            });
        }

        vm.resetSearch = function () {
            vm.searchInput = {
                firstName: '',
                lastName: ''
            };

            personResource.query(function (data) {
                vm.persons = data;
            });
        }

        vm.deleteClick = function (id) {
            if (confirm("Delete this Product?")) {
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
