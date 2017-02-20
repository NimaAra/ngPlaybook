(function (module) {
	"use strict";

	directive.$inject = ["alertService"];
	function directive(alertService) {
		function linker(scope, element, attrs) {
			scope.currentAlerts = alertService.currentAlerts;
			scope.removeAlert = alertService.removeAlert;
		}

		return {
			restrict: "EA", // E = element, A = attribute, C = class, M = comment  
			scope: {
				// @ reads the attribute value, = provides two-way binding, & works with functions
			},
			transclude: false,
			templateUrl: "client/app/common/alerting/alert.html",
			link: linker
		};
	}

	module.directive("alerts", directive);
})(angular.module("common.alerting"));