/**
 * Created by Deb on 8/26/2014.
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
            vm.title = "Edit: " + vm.person.firstName;
        }
        else {
            vm.title = "New Person"
        }

        //vm.submit = function (isValid) {
        //    if (isValid) {
        //        vm.person.$save(function (data) {
        //            toastr.success("Save Successful");
        //        });
        //    } else {
        //        alert("Please correct the validation errors first.");
        //    }
            
        //}

        vm.cancel = function () {
            $state.go('personList');
        }

        vm.saveClick = function (persomForm) {
            if (persomForm.$valid) {
                if (vm.title === "New Person") {
                    dService.insertData(person);
                }
                else {
                    dService.updateData(person);
                }
                toastr.success("Save Successful");
            }
            else {
                alert("Please correct the validation errors first.");
            }
        }
    }
}());
