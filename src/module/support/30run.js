/*
*
* @author  "MrXploder"
* @company "EleDevelopment SpA."
* @date		 "May/2018" 
* @about   "This is a Run method from AngularJS that handles 
					 the initialization of the ngStorage enviroment variables"
*	
*/
(function(){
	angular
	.module('angularApp')
	.run(support);

	support.$inject = ["$localStorage", "$window"];

	function support($localStorage){
		var _default = {
			currentUser: {
				id: null,
				name: null,
				token: null,
				avatar: null,
			},
			filterParams: {
				filterByApplicant: '', 
				filterByClient: '-1',
				filterCompletedOnes: false,
				pagesToShow: 5,
				itemsPerPage: 5,
				searchTerm: '',
				sortBy: 'id',
				sortReverse: false,
			}
		};

		if(typeof $localStorage.currentUser === "undefined"){
			$localStorage.currentUser = _default.currentUser;
		}

		if(typeof $localStorage.viewTicketsParams  === "undefined"){
			$localStorage.viewTicketsParams = _default.filterParams;
		}
	}
})();