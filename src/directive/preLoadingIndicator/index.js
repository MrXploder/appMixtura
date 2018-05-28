(function(){
   angular
   .module('angularApp')
   .directive('preLoadingIndicator', preLoadingIndicator);

   function preLoadingIndicator(){
   	return{
   		restrict: 'E',
   		controller: 'preLoadingIndicator',
   		templateUrl: '/src/directive/preLoadingIndicator/template.html',
   	}
   }
})();