(function(module) {
    "use strict";

    configure.$inject = ["$delegate", "$log"];
    function decorator($delegate, $log) {
        const bindingWrapper = function (bindingFunction, bindingExpression) {
            return function() {
                const result = bindingFunction.apply(this, arguments);
                const trimmedResult = result.trim();
                const log = trimmedResult ? $log.info : $log.warn;
                log.call($log, bindingExpression + " = " + trimmedResult);
                return result;
            };
        };

        const serviceWrapper = function () {

            // Let the original delegate handle the call
            // and "arguments" which is the implicit arguments passed to every JS function
            const bindingFunction = $delegate.apply(this, arguments);
            if (angular.isFunction(bindingFunction) && arguments[0]) {
                return bindingWrapper(bindingFunction, arguments[0].trim());
            }
            return bindingFunction;
        };

        // make sure our wrapper looks just like the $interpolate service
        angular.extend(serviceWrapper, $delegate);

        return serviceWrapper;
    }

    configure.$inject = ["$provide"];
    function configure($provide) {
        $provide.decorator("$interpolate", decorator);
    }

    module.config(configure);
})(angular.module("common"));