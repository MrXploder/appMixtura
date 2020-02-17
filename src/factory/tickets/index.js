(function(){
	'use strict';
	angular
		.module('angularApp')
		.factory('Tickets', tickets);

	tickets.$inject = ['$resource', '$localStorage'];

	function tickets($resource, $localStorage){
		return $resource("/app/php/restapi/tickets.php",{},{
			update:{
				method: 'PUT',
			},
			create:{
				method: 'POST',
			}
		});
	};
})();
