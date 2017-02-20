(function() {
    "use strict";

    templateUrlFactory.$inject = ["$element", "$attrs"];
    function templateUrlFactory(element, attrs) {
        return "client/app/components/ui-stuff/ui-stuff.html";
    }

    controller.$inject = [];
    function controller() {
        const vm = this;

        
    }

    const component = {
        controller: controller,
        controllerAs: "vm",
        templateUrl: templateUrlFactory,
        transclude: false,
        bindings: {}
    };

    angular.module("core.ui", [])
           .component("uiStuff", component);
})();