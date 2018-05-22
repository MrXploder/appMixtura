(function(){
	'use strict';

	angular
	.module('support')
	.directive('sideNav', sideNav);

	function sideNav(){
		return{
			restrict: 'E',
			scope: {},
			controller: 'sideNav',
			controllerAs: 'vm',
			bindToController:{
				elements: '=',
			},
			templateUrl: "src/directive/sideNav/template.html"
		}
	}
})();