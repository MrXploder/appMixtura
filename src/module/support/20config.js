(function(){
	'use strict';

	angular
		.module('support')
		.config(httpProvider);

	httpProvider.$inject = ['$httpProvider'];
	
	function httpProvider($httpProvider) {
		$httpProvider.interceptors.push('preventTemplateCache');
	}
})();

(function(){
	'use strict';

	angular
		.module('support')
		.config(routeProvider);

	routeProvider.$inject = ["$routeProvider"];

	function routeProvider($routeProvider){
		$routeProvider
		.when("/home", {
			templateUrl: "/src/module/support/route/home/template.html",
		})
		.when("/login", {
			controller: "login",
			controllerAs: "lg",
			template: '<div></div>',
		})
		.when("/viewTickets", {
			controller: "viewTickets",
			controllerAs: "vt",
			templateUrl : "/src/module/support/route/viewTickets/template.html",
		})
		.otherwise({
			redirectTo: "/login",
		});
	};
})();