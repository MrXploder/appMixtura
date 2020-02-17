/*
*
* @author  "MrXploder"
* @company "EleDevelopment SpA."
* @date		 "May/2018" 
* @about   "This is the Main Controller that is initialized at the top
					 most tag. It handles the initialization of the login form
					 and adds event listeners for onLine API"
*	
*/
(function(){
	'use strict';

	angular
	.module('angularApp')
	.controller('mainController', mainController);

	mainController.$inject = ["$scope", "$localStorage", "$window", "$rootScope"];

	function mainController($scope, $localStorage, $window, $rootScope){
		var mc = this;
		$scope.$storage = $localStorage;

		mc.form = { name: null, pass: null };
		mc.logIn = logIn;
		mc.onLine = $window.navigator.onLine;
		mc.isRouteLoading = false;

		function logIn(){
			$scope.$broadcast('attemptToLogIn', mc.form); //"main" (parent) -> "login" (child) controller
		}

		$window.addEventListener("online", function () {
			mc.onLine = true;
			$scope.$digest();
		}, true);

		$window.addEventListener("offline", function () {
			mc.onLine = false;
			$scope.$digest();
		}, true);

		$rootScope.$on('$routeChangeStart', function(){
			mc.isRouteLoading = true;
		});

		$rootScope.$on('$routeChangeSuccess', function(){
			mc.isRouteLoading = false;
		});
	}
})();