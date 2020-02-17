(function(){
	angular
	.module('angularApp')
	.controller('loginController', loginController);

	loginController.$inject = ["userAuthentication", "$location", "$rootScope", "$scope", "$localStorage"];

	function loginController(userAuthentication, $location, $rootScope, $scope, $localStorage){
		var lg = this;

		$("#apps-side-nav").hide();
		$("#login-side-nav").css({left: "38%"});

		$scope.$on('attemptToLogIn', function(event, logInData){
			userAuthentication.logIn({name: logInData.name, pass: logInData.pass}).$promise.then(function success(response){
				$localStorage.currentUser = response.user;
				$.when($("#login-side-nav").animate({"left":"0%"}, "slow")).done(function(){
					$.when($('#apps-side-nav').show("slow")).done(function(){
						$('.button-collapse').sideNav({menuWidth: 300, edge: 'left', closeOnClick: true, draggable: true,});
					});
					$("#login-side-nav").hide("slow");
					Materialize.toast('Bienvenido '+response.user.name, 5000, 'green');
					$rootScope.$evalAsync(function(){
						$location.path("/home");
					});
				});
			});
		});
	}
})();