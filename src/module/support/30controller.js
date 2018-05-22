(function(){
	'use strict';

	angular
	.module('support')
	.controller('support', support);

	support.$inject = ["userAuthentication"];

	function support(userAuthentication){
		var sp = this;

		sp.sideNavElements = [{
			title: 'Crear Tickets',
			icon: 'fas fa-ticket-alt',
			route: '#!/createTickets',
		},{
			title: 'Administrar Tickets',
			icon: 'fas fa-toolbox',
			route: '#!/viewTickets',
		},{
			title: 'Facturar Tickets',
			icon: 'fas fa-money-bill-alt',
			route: '#!/billTickets',
		},{
			title : 'Login',
			icon: '',
			route: '#!/login',
		}];
	}
})();