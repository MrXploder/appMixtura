(function(){
	'use strict';
	angular
		.module('support')
		.factory('Clients', clients);

	function clients($resource, $localStorage){
		return $resource("/php/db_transactions/clients.php",{});
	};
})();