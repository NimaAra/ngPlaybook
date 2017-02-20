(function(module) {
    "use strict";

    configure.$inject = ["$delegate", "$injector"];
    function decorator($delegate, $injector) {
        return function (exception, cause) {

            // Let the original exception handler
            // handle the exception
            $delegate(exception, cause);

            // we are using $injector to get our service
            // so we can avoid the circular dependency error.
            const alertService = $injector.get("alertService");
            const message = exception.message ? exception.message : "something went horribly wrong!";
            alertService.addError(message);
        };
    }

    configure.$inject = ["$provide"];
    function configure($provide) {
        $provide.decorator("$exceptionHandler", decorator);
    }

    module.config(configure);
})(angular.module("common"));