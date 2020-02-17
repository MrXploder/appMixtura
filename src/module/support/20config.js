(function() {
  "use strict";

  angular.module("angularApp").config(httpProvider);

  httpProvider.$inject = ["$httpProvider"];

  function httpProvider($httpProvider) {
    $httpProvider.interceptors.push("preventTemplateCache");
  }
})();

(function() {
  "use strict";

  angular.module("angularApp").config(routeProvider);

  routeProvider.$inject = ["$routeProvider"];

  function routeProvider($routeProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "/app/src/module/support/route/home/template.html"
      })
      .when("/login", {
        controller: "loginController",
        controllerAs: "lg",
        template: " "
      })
      .when("/exit", {
        controller: "exitController",
        template: " "
      })
      .when("/viewTickets", {
        controller: "viewTicketsController",
        controllerAs: "vt",
        templateUrl: "/app/src/module/support/route/viewTickets/template.html"
      })
      .when("/createTickets", {
        controller: "createTicketsController",
        controllerAs: "ct",
        templateUrl: "/app/src/module/support/route/createTickets/template.html"
      })
      .otherwise({
        redirectTo: "/home"
      });
  }
})();
