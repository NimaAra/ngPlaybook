(function () {
    "use strict";

    templateUrlFactory.$inject = ["$element", "$attrs"];
    function templateUrlFactory(element, attrs) {
        return "client/app/components/user-list/user-list.html";
    }

    controller.$inject = ["userRemovalConfirmation", "alertService"];
    function controller(userRemovalConfirmation, alertService) {
        const vm = this;

        vm.users = [
            { firstName: "Scott", lastName: "Hanselman", rating: 1 },
            { firstName: "Jon", lastName: "Skeet", rating: 2 },
            { firstName: "Nick", lastName: "Craver", rating: 1 },
            { firstName: "John", lastName: "Papa", rating: 3 },
            { firstName: "Damien", lastName: "Edwards", rating: 5 }
        ];

        vm.removeUser = user => {
            userRemovalConfirmation(user)
                .then(() => {
                    var idx = vm.users.indexOf(user);
                    vm.users.splice(idx, 1);
                    alertService.addInfo("Removed " + user.firstName);
                })
                .catch(() => /ignore/);;
        };
    }

    const component = {
        controller: controller,
        controllerAs: "vm",
        templateUrl: templateUrlFactory,
        transclude: false,
        bindings: {}
    };

    angular.module("core.ui.users", ["ui.bootstrap", "core.alerting"])
           .component("userList", component);
})();