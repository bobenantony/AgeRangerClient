/**
 * Created by Boben.
 */
(function () {
    "use strict";

    angular
        .module("ageRangeInfoManagement")
        .controller("PersonAddOrEditCtrl",
        ["person",
            "$state",
            "dataService",
            PersonAddOrEditCtrl]);


    function PersonAddOrEditCtrl(person, $state, dataService) {
        var vm = this;
        var dService = dataService;

        var serverPath = "http://localhost:61459";

        vm.person = person;

        if (vm.person && vm.person.id) {
            vm.title = "Edit : " + vm.person.firstName;
        }
        else {
            vm.title = "New Person"
        }

        //On clicking the cancel button on 'AddOrEditView' , it redirects the Url to 'PersonListView'
        vm.cancel = function () {
            $state.go('personList');
        }

        //On clicking the save button on 'AddOrEditView' , it performs 'Insert or Update' depending on the 
        //presence of title and redirects the Url to 'PersonListView'
        vm.saveClick = function (persomForm) {
            if (persomForm.$valid) {
                if (vm.title === "New Person") {
                    dService.insertData(person);
                }
                else {
                    dService.updateData(person);
                }
            }
            else {
                alert("Please correct the validation errors first.");
            }
        }
    }
}());
