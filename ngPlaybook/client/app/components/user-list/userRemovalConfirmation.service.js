(function(module) {
    "use strict";

    service.$inject = ["$uibModal"];
    function service($uibModal) {
        return function(user) {

            function controller() {
                const vm = this;
                vm.user = user;
            }

            const options = {
                templateUrl: "client/app/components/user-list/userRemovalConfirmation.modal.html",
                controller: controller,
                controllerAs: "vm"
            };

            return $uibModal.open(options).result;
        };
    }

    module.factory("userRemovalConfirmation", service); 
})(angular.module("core.ui.users"));
	
	