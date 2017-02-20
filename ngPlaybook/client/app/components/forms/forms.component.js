(function() {
    "use strict";

    templateUrlFactory.$inject = ["$element", "$attrs"];
    function templateUrlFactory(element, attrs) {
        return "client/app/components/forms/forms.html";
    }

    controller.$inject = ["$location", "userModel"];
    function controller($location, userModel) {
        const vm = this;

        vm.user = userModel;
        vm.submit = () => {
            $location.path("/results");
        };
    }

    const component = {
        controller: controller,
        controllerAs: "vm",
        templateUrl: templateUrlFactory,
        transclude: false,
        bindings: {}
    };

    angular.module("core.forms", [])
           .component("forms", component);
})();