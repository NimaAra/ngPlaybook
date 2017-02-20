(function() {
    "use strict";

    templateUrlFactory.$inject = ["$element", "$attrs"];
    function templateUrlFactory(element, attrs) {
        return "client/app/components/error-prone/error-prone.html";
    }

    controller.$inject = ["$http", "alertService"];
    function controller($http, alertService) {
        const vm = this;

        vm.makeSuccess = (msg) => {
            if (!msg) { msg = "Hey I did it!"; }
            alertService.addError(msg);
        };

        vm.makeInfo = (msg) => {
            if (!msg) { msg = "FYI, I did it!"; }
            alertService.addInfo(msg);
        };

        vm.makeWarn = (msg) => {
            if (!msg) { msg = "Be careful now, I may do it!"; }
            alertService.addWarn(msg);
        };

        vm.makeError = (msg) => {
            if (!msg) { msg = "Ooops I did it again!"; }
            alertService.addError(msg);
        };

        vm.makeAlert = () => alertService.addAlert(vm.alertType, vm.alertMessage);
        vm.makeException = function() {
            throw new Error("Something has gone wrooong!");
        };

        vm.makeSuccessRequest = function() {
            const endpoint = "api/slow";
            $http.get(endpoint)
                 .catch(alertService.errorHandler("failed to load data from: " + endpoint));
        };

        vm.makeBadRequest = function () {
            const endpoint = "api/non-existent";
            $http.get(endpoint)
                 .catch(alertService.errorHandler("failed to load data from: " + endpoint));
        };
    }

    const component = {
        controller: controller,
        controllerAs: "vm",
        templateUrl: templateUrlFactory,
        transclude: false,
        bindings: {}
    };

    angular.module("core.alerting", ["common.alerting"])
           .component("errorProne", component);
})();