(function(){
	angular
	.module('support')
	.controller('login', login);

	login.$inject = ["userAuthentication", "$location", "$rootScope"];

	function login(userAuthentication, $location, $rootScope){
		$("#slide-out").css({left: "38%"});

		userAuthentication.isAuthenticated().then(function success(response){
			$.when($("#slide-out").animate({"left":"0%"}, "slow")).done(function(){
				$rootScope.$apply(function(){
					$location.path("/home");
				});
			});
		}, function error(response){
			console.log("reject, redirecting...");
		});
	}
})();