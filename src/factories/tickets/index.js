(function(){
	'use strict';
	angular
		.module('support')
		.factory('Tickets', tickets);

	function tickets($resource, $localStorage){
		return $resource("/php/db_transactions/tickets.php",{});
	};
})();
