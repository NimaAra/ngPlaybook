(function(module) {
    "use strict";

    service.$inject = ["$location", "$http", "formEncoderService", "currentUserService"];
    function service($location, $http, formEncoderService, userService) {
        return {
            login: login
        };

        function login(userName, password) {
            const config = {
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };

            const data = {
                username: userName,
                password: password,
                grant_type: "password"
            };

            return $http
                .post("/login", formEncoderService.encode(data), config)
                .then(resp => {
                    userService.setProfile(userName, resp.data.access_token);
                    return userName;
                });
        }
    }

    module.factory("oathService", service);
})(angular.module("common"));
	
	