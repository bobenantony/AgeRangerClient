(function () {
    "use strict";

    angular.module("common.services").factory("personResource",["$resource","appSettings",personResource])

    function personResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/persons/:id");
    }
}());

