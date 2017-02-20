(function(module) {
    "use strict";

    interceptor.$inject = ["currentUserService", "$q"];
    function interceptor(userService, $q) {
        return {
            request: request
        };

        function request(config) {
            if (userService.profile.loggedIn) {
                config.headers.Authorization = `Bearer ${userService.profile.token}`;
            }

            return $q.when(config);
        }
    }

    const id = "addTokenInterceptor";
    module
        .factory(id, interceptor)
        .config(function($httpProvider) {
            $httpProvider.interceptors.push(id);
        });
})(angular.module("common"));