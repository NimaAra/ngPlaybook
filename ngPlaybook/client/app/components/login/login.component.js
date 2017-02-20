(function(module) {
    "use strict";

    templateUrlFactory.$inject = ["$element", "$attrs"];
    function templateUrlFactory(element, attrs) {
        return "client/app/components/login/login.html";
    }

    controller.$inject = ["oathService", "currentUserService", "loginRedirectInterceptor"];
    function controller(oathService, currentUserService, loginRedirectInterceptor) {
        const vm = this;

        if (currentUserService.profile.loggedIn) {
            loginRedirectInterceptor.redirectToRoot();
        }

        vm.userProfile = currentUserService.profile;

        vm.submit = () => {
            oathService
                .login(vm.user.name, vm.user.pass)
                .then(() => loginRedirectInterceptor.redirectToRoot())
                .catch(error => {
                    console.log(error);
                });
            resetUserDetails();
        };

        function resetUserDetails() {
            vm.user = {
                name: "",
                pass: ""
            };
        }
    }

    const component = {
        controller: controller,
        controllerAs: "vm",
        templateUrl: templateUrlFactory,
        transclude: false,
        bindings: {}
    };

    module.component("login", component);
})(angular.module("core.security", ["common"]));