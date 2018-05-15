(function(){
  angular
    .module('support')
    .factory('preventTemplateCache', preventTemplateCache);

  preventTemplateCache.$inject = ['$injector'];

  function preventTemplateCache($injector){
    var ENV = $injector.get('ENV');
    return {
      'request': function(config) {
        config.url = config.url + '?t=' + ENV.build;
        return config;
      }
    }
  }
})();