(function(module) {
    "use strict";

    service.$inject = ["localStorageService"];
    function service(localStorageService) {
        const userkey = "user_token";
        const profile = initialize();

        return {
            setProfile: setProfile,
            profile: profile
        };

        function initialize() {
            const user = {
                username: "",
                token: "",
                get loggedIn() {
                    return this.token;
                }
            };

            const localUser = localStorageService.get(userkey);
            if (localUser) {
                user.username = localUser.username;
                user.token = localUser.token;
            }

            return user;
        }

        function setProfile(username, token) {
            profile.username = username;
            profile.token = token;
            localStorageService.add(userkey, profile);
        }
    }

    module.factory("currentUserService", service); 
})(angular.module("common"));
	
	