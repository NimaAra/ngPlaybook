(function(module) {
    "use strict";

    service.$inject = [];
    function service() {
        return {
            encode: encode
        };

        function encode(data) {
            const pairs = [];
            for (let item in data) {
                pairs.push(encodeURIComponent(item) + "=" + encodeURIComponent(data[item]));
            }

            return pairs.join("&").replace("/%20/g", "+");
        }
    }

    module.factory("formEncoderService", service);
})(angular.module("common"));
	
	