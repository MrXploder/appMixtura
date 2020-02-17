(function(){
	'use strict';
	angular
		.module('angularApp')
		.factory('Clients', clients);

	clients.$inject = ['$resource', '$localStorage'];

	function clients($resource, $localStorage){
		return $resource("/app/php/restapi/clients.php",{});
	};
})();