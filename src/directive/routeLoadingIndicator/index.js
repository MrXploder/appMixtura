(function(){
  angular
  .module('support')
  .directive('routeLoadingIndicator', routeLoadingIndicator);

  routeLoadingIndicator.$inject = ["$rootScope"];

  function routeLoadingIndicator($rootScope){
    return {
      restrict: 'E',
      templateUrl: '/src/directive/routeLoadingIndicator/template.html',
      link:function(scope, elem, attrs){
        scope.isRouteLoading = true;

        $rootScope.$on('$routeChangeStart', function(){
          scope.isRouteLoading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function(){
          scope.isRouteLoading = false;
        });
      }
    };
  }
})();