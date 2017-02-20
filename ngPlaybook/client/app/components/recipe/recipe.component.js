(function(module) {
    "use strict";

    templateUrlFactory.$inject = ["$element", "$attrs"];
    function templateUrlFactory(element, attrs) {
        return "client/app/components/recipe/recipe.html";
    }

    controller.$inject = ["$location", "$sce", "recipeService", "currentUserService"];
    function controller($location, $sce, recipeService, userService) {
        const vm = this;

        vm.recipe = {};
        vm.getTrustedTitle = function() {
            return $sce.trustAsHtml(vm.recipe.title);
        };

        if (!userService.profile.loggedIn) {
            $location.path("/");
        }

        recipeService.getRecipe().then(recipe => vm.recipe = recipe);
    }

    const component = {
        controller: controller,
        controllerAs: "vm",
        templateUrl: templateUrlFactory,
        transclude: false,
        bindings: {}
    };

    module.component("recipe", component);
})(angular.module("core.recipe", ["common"]));