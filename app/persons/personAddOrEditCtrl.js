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
            "dataFactory",
            PersonAddOrEditCtrl]);


    function PersonAddOrEditCtrl(person, $state, dataFactory) {
        var vm = this;
        vm.status;

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
                    dataFactory.insertPerson(person)
                    .then(function (response) {
                        vm.status = 'Inserted Person! Refreshing list.';
                        // Display Success message
                        alert(vm.status);
                        $state.go('personList');
                    }, function (error) {
                        vm.status = 'Unable to insert person: ' + error.message;
                        alert(vm.status);
                    });
                }
                else {
                    dataFactory.updatePerson(person)
                    .then(function (response) {
                        vm.status = 'Updated Person! Refreshing list.';
                        // Display Success message
                        alert(vm.status);;
                        $state.go('personList');
                    }, function (error) {
                        vm.status = 'Unable to update person: ' + error.message;
                        alert(vm.status);
                    });
                }
            }
            else {
                alert("Please correct the validation errors first.");
            }
        }
    }
}());
