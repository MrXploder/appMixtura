module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    gitinfo: {
    },
    ngconstant: {
      options: {
        space: ' ',
        wrap: true,
        deps: ['ngAnimate', 'ngRoute', 'ngStorage', 'ngResource', 'angular-loading-bar', 'angularUtils.directives.dirPagination', 'ui.materialize'],
        dest: 'src/module/support/10index.js',
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
        {constName: 'envShortSHA', constValue: '<%= gitinfo.local.branch.current.shortSHA %>'},
        {constName: 'envAuthor', constValue: '<%= gitinfo.local.branch.current.lastCommitAuthor %>'},
        {constName: 'envLastCommitTime', constValue: '<%= gitinfo.local.branch.current.lastCommitTime %>'},
        {constName: 'envBranch', constValue: '<%= gitinfo.local.branch.current.name %>'}
        ],
        src: 'php/enviroment.php',
        dest: 'php/enviroment.php'
      },
    },
    concat: {
      options: {
        separator: '\n',
      },
      js: {
        src: ['src/vendor/*.js', 'src/module/support/*.js', 'src/directive/**/*.js', 'src/factory/**/*.js', 'src/filter/**/*.js',  'src/module/support/modal/**/*.js', 'src/module/support/route/**/*.js'],
        dest: 'dist/<%= gitinfo.local.branch.current.SHA %>.js',
      },
      css:{
        src: ['css/*.css'],
        dest: 'dist/<%= gitinfo.local.branch.current.SHA %>.css',
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= gitinfo.local.branch.current.SHA %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/<%= gitinfo.local.branch.current.SHA %>.min.css': ['css/*.css']
        }
      }
    },
    obfuscator: {
      options: {
      },
      task1: {
        options: {
            // options for each sub task
          },
          files: {
            'dist/<%= gitinfo.local.branch.current.SHA %>.min.obs.js': ['dist/<%= gitinfo.local.branch.current.SHA %>.min.js']
          }
        }
      }
    });

  grunt.loadNpmTasks('grunt-gitinfo');
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-php-constants');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-obfuscator');

  grunt.registerTask('default', ['gitinfo', 'ngconstant', 'php_constants', 'concat', 'uglify', 'cssmin', 'obfuscator']);
  grunt.registerTask('dev', ['gitinfo', 'ngconstant', 'php_constants']);

};