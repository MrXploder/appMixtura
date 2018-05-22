(function(){
	angular
	.module('support')
	.controller('preLoadingIndicator', preLoadingIndicator);

	function preLoadingIndicator(){
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