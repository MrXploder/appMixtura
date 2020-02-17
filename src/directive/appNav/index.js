(function(){
	'use strict';

	angular
	.module('angularApp')
	.directive('sideNav', sideNav);

	function sideNav(){
		return{
			restrict: 'E',
			scope: {},
			controller: 'sideNavController',
			controllerAs: 'vm',
			bindToController:{
				elements: '=',
			},
			templateUrl: "src/directive/sideNav/template.html"
		}
	}
})();