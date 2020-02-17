(function(){
	'use strict';

	angular
	.module('angularApp')
	.factory("userAuthentication", userAuthentication);

	userAuthentication.$inject = ["$resource"];

	function userAuthentication($resource){
		return $resource("/app/php/restapi/auth.php",{},{
			logIn:{
				method: 'POST',
			},
			logOut:{
				method: 'HEAD',
				params: {
					action: "logout"
				},
			},
			isLoggedIn:{
				method: 'HEAD',
				params: {
					action: "verify"
				},
			}
		});
	};
})();