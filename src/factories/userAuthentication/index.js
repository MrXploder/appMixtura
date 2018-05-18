(function(){
	'use strict';

	angular
	.module('support')
	.factory("userAuthentication", userAuthentication);

	userAuthentication.$inject = ["$q", "$timeout"];
	function userAuthentication($q, $timeout){
		return {
			isAuthenticated: function(){
				var deferred = $q.defer();
				$timeout(function(){
					deferred.resolve("yes!");
				},2000);
				return deferred.promise;
			}
		}
	}
})();