(function(){
	'use strict';

	angular
		.module('support')
		.controller('detailTicket', detailTicket);

		detailTicket.$inject = ['Tickets', 'Operators', '$scope', '$rootScope', 'Message', 'modalInstance'];

		function detailTicket(Tickets, Operators, $scope, $rootScope, Message, modalInstance){
			var dt = this;

			dt.disabled = true;
			dt.operators = Operators.query();
			dt.selectedTicket = Tickets.get({id: Message.id});
			dt.leftButton = leftButton;
			dt.rightButton = rightButton;

			console.log(modalInstance);

			function leftButton(){
				if(dt.disabled){
					dt.disabled = false;
				}
				else{
					dt.selectedTicket.save();
				}
			}

			function rightButton(){
				if(!dt.disabled){
					dt.disabled = true;
				}

			}
		};
})();