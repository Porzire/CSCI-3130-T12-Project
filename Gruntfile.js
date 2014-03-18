module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/script.js',
        dest: 'js/script.min.js'
      }
    },
    jasmine: {
      src: 'js/script.js',
      options: {
        vendor: 'js/jquery-1.9.1.min.js',
        specs: 'js/test/scriptSpec.js'
      }
    },
    yuidoc: {
      mytarget: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: 'js/',
          outdir: 'docs/'
        }
      }
    },
    clean: ['docs', 'js/script.min.js']
 });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['test', 'uglify', 'yuidoc']);
  grunt.registerTask('test', ['jasmine']);
  //'clean': build-in function in 'grunt-contrib-clean'.
};
