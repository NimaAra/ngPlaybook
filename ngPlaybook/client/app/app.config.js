(function () {
    "use strict";

    configureAngularRouter.$inject = ["$routeProvider", "$locationProvider"];
    function configureAngularRouter($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        handleLogin.$inject = ["$location", "currentUserService"];
        function handleLogin($location, currentUserService) {
            if (!currentUserService.profile.loggedIn) {
                $location.path("/login");
            } else {
                $location.path("/home");
            }
        }

        lazy.$inject = ["$timeout", "$q"];
        function lazy($timeout, $q) {
            const defer = $q.defer();

            $timeout(function () {
                defer.reject("Network is down");
            }, 500);

            return defer.promise;
        }

        resultController.$inject = ["userModel"];
        function resultController(userModel) {
            const vm = this;
            vm.user = userModel;
        }

        const templatesPath = "client/app/templates/";
        const routes = [
            { url: "/", settings: { resolve: { check: handleLogin } } },
            { url: "/home", settings: { template: "<recipe></recipe>" } },
            { url: "/alerts", settings: { template: "<error-prone></error-prone>" } },
            { url: "/login", settings: { template: "<login></login>" } },
            { url: "/ui", settings: { template: "<ui-stuff></ui-stuff>" } },
            { url: "/forms", settings: { template: "<forms></forms>" } },
            { url: "/results", settings: { templateUrl: "client/app/components/forms/results.html", controller: resultController, controllerAs: "vm" } },
            { url: "/void", settings: { resolve: { lazy: lazy } } },
            {
                url: "/noRoute", settings: {
                    resolve: {
                        throws: function () { throw "not gonna route!"; }
                    }
                }
            },
            {
                url: "/404", settings: {
                    redirectTo: function (params, currPath, currSearch) {
                        window.location.assign(templatesPath + "404.html");
                    }
                }
            }
        ];

        routes.forEach(r => {
            r.settings.caseInsensitiveMatch = true;
            $routeProvider.when(r.url, r.settings);
        });
        $routeProvider.otherwise({ redirectTo: "/" });
    }

    configureUiRouter.$inject = ["$stateProvider"];
    function configureUiRouter($stateProvider) {
        $stateProvider
            .state("dashboard", { url: "/dashboard", templateUrl: "templates/dashboard.html" })
            .state("admin", { url: "/admin", templateUrl: "templates/admin.html" });
    }

    handleRouteEvents.$inject = ["$rootScope", "$location", "alertService"];
    function handleRouteEvents($rootScope, $location, alertService) {
        $rootScope.$on("$routeChangeStart", function (event) {
            const msg = "Starting route";
            alertService.addInfo(msg);
        });

        $rootScope.$on("$routeChangeSuccess", function (event) {
            const msg = "Route Success";
            alertService.addInfo(msg);
        });

        $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
            const destination = (current && (current.title || current.name || current.loadedTemplateUrl))
                || "unknown target";
            const msg = `Error routing to ${destination}. ${rejection.msg || ""}`;
            alertService.addError(msg);
            $location.path("/");
        });
    }

    angular
        .module("ngPlaybook",
        [
            // internal
            "ngRoute",
            "ui.router",
            "ui.bootstrap",
            "ngAnimate",
            "ngSanitize",
            "common",
            "core.security",
            "core.recipe",
            "core.alerting",
            "core.ui",
            "core.ui.users",
            "core.forms"

            // external
        ])
        .config(configureAngularRouter)
    //        .config(configureUiRouter);
        .run(handleRouteEvents);
})();