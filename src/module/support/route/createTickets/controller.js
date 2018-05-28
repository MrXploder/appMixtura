(function(){
	'use strict';

	angular
	.module('angularApp')
	.controller('createTicketsController', createTicketsController);

	createTicketsController.$inject = ['Tickets', 'Clients'];

	function createTicketsController(Tickets, Clients){
		var ct = this;

		ct.clients = Clients.query();
		ct.newTicket = {};
		ct.submitTicket = submitTicket;

		function submitTicket(){
		}
	}
})();