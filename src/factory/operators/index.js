(function(){
	'use strict';
	
	angular
		.module('angularApp')
		.factory('Operators', operators);

	operators.$inject = ['$resource', '$localStorage'];

	function operators($resource, $localStorage){
		return $resource("/php/restapi/operators.php",{});
	};
})();
