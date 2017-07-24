(function () {
    "use strict";

    var app = angular.module("ageRangeInfoManagement", ["common.services","ui.router"]);

    app.config(["$stateProvider",
        "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state("personList", {
                    url: "/",
                    templateUrl: "app/persons/personListView.html"
                })

                .state("personAddOrEdit", {
                    abstract: true,
                    url: "/persons/:id",
                    templateUrl: "app/persons/personAddOrEditView.html",
                    controller: "PersonAddOrEditCtrl as vm",
                    resolve: {
                        personResource: "personResource",

                        person: function (personResource, $stateParams) {
                            var id = $stateParams.id;
                            return personResource.get({ id: id }).$promise;
                        }
                    }
                })

                .state("personAddOrEdit.info", {
                    url: "/info",
                    templateUrl: "app/persons/personAddOrEditInfoView.html"
                })

        }]
    );
}());