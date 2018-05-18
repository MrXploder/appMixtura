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
		.when("/viewTickets", {
			controller: "viewTickets",
			controllerAs: "vt",
			templateUrl : "/src/support/tab/viewTickets/template.html",
		})
		.otherwise("/");
	};
})();