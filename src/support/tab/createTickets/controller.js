(function(){
	'use strict';

	angular
	.module('support')
	.controller('createTickets', createTickets);

	createTickets.$inject = ['Tickets', 'Clients'];

	function createTickets(Tickets, Clients){
		var ct = this;

	}
})();