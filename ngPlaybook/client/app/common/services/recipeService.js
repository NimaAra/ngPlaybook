(function(module) {
    "use strict";

    service.$inject = ["$http"];
    function service($http) {
        const endpoint = "/api/secret";

        return {
            getRecipe: getRecipe
        };

        function getRecipe() {
            return $http.get(endpoint).then((resp) => resp.data);
        }
    }

    module.factory("recipeService", service);
})(angular.module("common"));
	
	