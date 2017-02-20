(function (module) {
    "use strict";

    directive.$inject = ["requestInterceptor"];
    function directive(requestInterceptor) {
        function linker(scope, element, attrs) {
            scope.$watch(function () {
                return requestInterceptor.getRequestCount();
            }, function (requestCount) {
                scope.requestCount = requestCount;
            });
        }

        return {
            restrict: "EA",
            transclude: true,
            scope: {},
            template: `<ng-transclude ng-show="requestCount">Loading...</ng-transclude>`,
            link: linker
        };
    }

    module.directive("workSpinner", directive);
})(angular.module("common"));