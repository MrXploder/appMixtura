(function(){
	'use strict';

	angular
	.module('angularApp')
	.config(httpProvider);

	httpProvider.$inject = ['$httpProvider'];
	
	function httpProvider($httpProvider) {
		$httpProvider.interceptors.push('preventTemplateCache');
	}
})();

(function(){
	'use strict';

	angular
	.module('angularApp')
	.config(routeProvider);

	routeProvider.$inject  = ["$routeProvider"];
	defaultResolve.$inject = ["userAuthentication", "$rootScope", "$location", "$localStorage"];
	loginResolve.$inject 	 = ["userAuthentication", "$rootScope", "$location", "$localStorage"];

	function routeProvider($routeProvider){
		$routeProvider
		.when("/home", {
			templateUrl: "/app/src/module/support/route/home/template.html",
			resolve: { initialData: defaultResolve },
		})
		.when("/login", {
			controller: "loginController",
			controllerAs: "lg",
			template: " ",
			resolve: { isLoggedIn: loginResolve },
		})
		.when("/exit",{
			controller: "exitController",
			template: " ",
		})
		.when("/viewTickets", {
			controller: "viewTicketsController",
			controllerAs: "vt",
			templateUrl : "/app/src/module/support/route/viewTickets/template.html",
			resolve: { isLoggedIn: defaultResolve	},
		})
		.when("/createTickets", {
			controller: "createTicketsController",
			controllerAs: "ct",
			templateUrl: "/app/src/module/support/route/createTickets/template.html",
			resolve: { isLoggedIn: defaultResolve },
		})
		.otherwise({
			redirectTo: "/home",
		});
	};

	function defaultResolve(userAuthentication, $rootScope, $location, $localStorage){
		userAuthentication.isLoggedIn({token: $localStorage.currentUser.token}).$promise.catch(function error(response){
			$rootScope.$evalAsync(function(){
				$location.path("/login");
			});
		}); 
	};

	function loginResolve(userAuthentication, $rootScope, $location, $localStorage){
		userAuthentication.isLoggedIn({token: $localStorage.currentUser.token}).$promise.catch(function error(response){
			$('#apps-side-nav').hide("fast");
			$("#login-side-nav").show("slow").css({left: "38%"});
		}); 
	};
})();