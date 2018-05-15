module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    gitinfo: {
    },
    ngconstant: {
      options: {
        space: ' ',
        deps: ['ngStorage', 'ngResource', 'angular-loading-bar', 'angularUtils.directives.dirPagination', 'ui.materialize'],
        dest: 'src/support/10index.js',
        name: 'support'
      },
      dist: {
        constants: {
          'ENV': '<%= gitinfo.local.branch.current %>'
        }
      }
    },
    php_constants: {
      static_option: {
        options: [
          {constName: 'envSHA', constValue: '<%= gitinfo.local.branch.current.SHA %>'},
          {constName: 'envName', constValue: '<%= gitinfo.local.branch.current.SHA %>'},
          {constName: 'envAuthor', constValue: '<%= gitinfo.local.branch.current.SHA %>'},
          {constName: 'envLastCommitTime', constValue: '<%= gitinfo.local.branch.current.SHA %>'},
          {constName: 'envDebug', constValue: '<%= gitinfo.local.branch.current.SHA %>'}
        ],
        src: 'php/dependencies/Enviroment.php',
        dest: 'php/dependencies/Enviroment.php'
      },
    },
  })

  grunt.loadNpmTasks('grunt-gitinfo');
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-php-constants');
  grunt.registerTask('default', ['gitinfo', 'ngconstant', 'php_constants']);
};