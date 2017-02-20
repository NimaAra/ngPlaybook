(function(module) {
    "use strict";

    service.$inject = [];
    function service() {
        return {
            userName: "",
            email: "",
            website: "",
            phone: "",
            birthdate: "",
            age: "",
            feelLike: "",
            color: "",
            cuisine: "",
            bio: "",
            terms: "",
            status: "",
            rating: ""
        };
    }

    module.factory("userModel", service);
})(angular.module("core.forms"));
	
	