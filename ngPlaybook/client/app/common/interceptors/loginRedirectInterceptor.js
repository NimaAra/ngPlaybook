(function(module) {
    "use strict";

    interceptor.$inject = ["$location", "$q"];
    function interceptor($location, $q) {
        let lastPath = "/";

        return {
            responseError: responseError,
            redirectPostLogin: redirectPostLogin,
            redirectToRoot: redirectToRoot
        };

        function responseError(response) {
            // in case of unauthorized
            if (response.status === 401) {
                lastPath = $location.path();
                $location.path("/login");
            }

            return $q.reject(response);
        }

        function redirectPostLogin() {
            $location.path(lastPath);
            lastPath = "/";
        }

        function redirectToRoot() {
            $location.path("/");
        }
    }

    const id = "loginRedirectInterceptor";
    module
        .factory(id, interceptor)
        .config(function($httpProvider) {
            $httpProvider.interceptors.push(id);
        });
})(angular.module("common"));