(function(){
	angular
	.module('angularApp')
	.controller('preLoadingIndicatorController', preLoadingIndicatorController);

	function preLoadingIndicatorController(){
		$("#preLoadingIndicator").modal({
			dismissible:!1,
			opacity:.5,
			inDuration:300,
			outDuration:200,
			startingTop:"30%",
			endingTop:"30%",
			ready:function(o,i){},
			complete:function(){}
		});
	}
})();