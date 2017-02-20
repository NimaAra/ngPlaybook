(function (module) {
    "use strict";

    service.$inject = ["$timeout"];
    function service($timeout) {
        const currentAlerts = [];
        const timeoutMsec = 3000;

        return {
            addAlert: addAlert,
            removeAlert: removeAlert,
            addSuccess: addSuccess,
            addInfo: addInfo,
            addWarn: addWarn,
            addError: addError,
            errorHandler: errorHandler,
            currentAlerts: currentAlerts
        };

        function addAlert(type, message) {
            const alert = { type, message };
            currentAlerts.push(alert);
            console.log(alert);
            $timeout(() => removeAlert(alert), timeoutMsec);
        }

        function removeAlert(alert) {
            const index = currentAlerts.indexOf(alert);
            currentAlerts.splice(index, 1);
        }

        // The type messages map to bootstrap alert classes.
        function addSuccess(message) {
            addAlert("success", message);
        }

        function addInfo(message) {
            addAlert("info", message);
        }

        function addWarn(message) {
            addAlert("warning", message);
        }

        function addError(message) {
            addAlert("danger", message);
        }

        function errorHandler(description) {
            return function () {
                addError(description);
            };
        }
    }

    module.factory("alertService", service);
})(angular.module("common.alerting"));
